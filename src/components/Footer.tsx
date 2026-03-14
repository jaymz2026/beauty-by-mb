import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-slate-50 dark:bg-slate-900/50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h2 className="text-lg font-[800] uppercase tracking-tighter">Lumière Beauté</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">Redefining luxury skincare through the perfect balance of botanical purity and clinical excellence.</p>
            <div className="flex gap-4">
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">camera</span></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">video_library</span></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" to="/shop">Face Oils</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/shop">Serums & Treatments</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/shop">Cleansers</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/shop">Gift Sets</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6">Learn</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" to="/story">Our Story</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/ingredients">Ingredients Glossary</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/sustainability">Sustainability</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/research">Scientific Research</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" to="/support">Shipping & Returns</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/contact">Contact Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/boutiques">Find a Boutique</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/faq">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 uppercase tracking-widest">
          <p>© 2024 Lumière Beauté. All rights reserved.</p>
          <div className="flex gap-8">
            <Link className="hover:text-primary" to="/privacy">Privacy Policy</Link>
            <Link className="hover:text-primary" to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
