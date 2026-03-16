import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [showMfa, setShowMfa] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { refreshSession } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Check for MFA factors
    const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
    if (factorsError) {
      setError(factorsError.message);
      setLoading(false);
      return;
    }

    const totpFactor = factors.totp[0];
    if (totpFactor) {
      setFactorId(totpFactor.id);
      setShowMfa(true);
      setLoading(false);
    } else {
      await refreshSession();
      // Check if user is admin and has no MFA
      const { data: profile } = await supabase.from('profiles').select('is_admin').single();
      if (profile?.is_admin) {
        navigate('/admin/mfa-setup');
      } else {
        navigate('/admin');
      }
    }
  };

  const handleMfaVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factorId) return;

    setLoading(true);
    setError(null);

    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.error) {
      setError(challenge.error.message);
      setLoading(false);
      return;
    }

    const verify = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code: mfaToken,
    });

    if (verify.error) {
      setError(verify.error.message);
      setLoading(false);
      return;
    }

    await refreshSession();
    navigate('/admin');
  };

  return (
    <main className="flex-grow flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-primary/5">
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">auto_awesome</span>
          <h1 className="text-2xl font-800">Admin Login</h1>
          <p className="text-slate-500 text-sm">Protected access for Lumière Beauté staff</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        {!showMfa ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-primary/10 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-primary/10 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleMfaVerify} className="space-y-4">
            <div className="text-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl mb-2">vibration</span>
              <p className="text-sm">Please enter the 6-digit code from your authenticator app.</p>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">MFA Code</label>
              <input
                type="text"
                value={mfaToken}
                onChange={(e) => setMfaToken(e.target.value)}
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
              {loading ? 'Verifying...' : 'Verify MFA'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
