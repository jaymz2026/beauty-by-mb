import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function MfaSetup() {
  const [step, setStep] = useState<'intro' | 'qr' | 'verify' | 'success'>('intro');
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { refreshSession } = useAuth();

  const handleStartEnroll = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        issuer: 'Lumière Beauté',
        friendlyName: 'Admin Portal'
      });

      if (error) throw error;

      setFactorId(data.id);
      setQrSvg(data.totp.qr_code);
      setStep('qr');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factorId) return;

    setLoading(true);
    setError(null);
    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: verifyCode,
      });

      if (verify.error) throw verify.error;

      setStep('success');
      await refreshSession();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-primary/5">
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">security</span>
          <h1 className="text-2xl font-800">Secure Your Account</h1>
          <p className="text-slate-500 text-sm">Multi-Factor Authentication is required for all administrators.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        {step === 'intro' && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              To protect the integrity of the Lumière Beauté catalog, we use Time-based One-Time Passwords (TOTP).
              You will need an app like Google Authenticator or Authy.
            </p>
            <button
              onClick={handleStartEnroll}
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? 'Initializing...' : 'Set Up Authenticator'}
            </button>
          </div>
        )}

        {step === 'qr' && qrSvg && (
          <div className="space-y-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Scan this QR code with your authenticator app.
            </p>
            <div
              className="bg-white p-4 rounded-xl border border-primary/10 inline-block mx-auto"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <button
              onClick={() => setStep('verify')}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all"
            >
              I've Scanned It
            </button>
          </div>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Enter the 6-digit code from your app to verify the setup.
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Verification Code</label>
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-primary/10 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary text-center tracking-[0.5em] font-bold"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Complete Setup'}
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              MFA has been successfully enabled on your account.
            </p>
            <button
              onClick={() => navigate('/admin')}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
