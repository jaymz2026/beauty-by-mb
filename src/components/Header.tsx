import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
            <h1 className="text-xl font-[800] tracking-tighter text-slate-900 dark:text-slate-100 uppercase">Lumière Beauté</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/shop" className={({ isActive }) => `text-sm font-semibold transition-colors hover:text-primary ${isActive ? 'text-primary' : ''}`}>Shop All</NavLink>
            <NavLink to="/shop/skincare" className={({ isActive }) => `text-sm font-semibold transition-colors hover:text-primary ${isActive ? 'text-primary' : ''}`}>Skincare</NavLink>
            <NavLink to="/collections" className={({ isActive }) => `text-sm font-semibold transition-colors hover:text-primary ${isActive ? 'text-primary' : ''}`}>Collections</NavLink>
            <NavLink to="/journal" className={({ isActive }) => `text-sm font-semibold transition-colors hover:text-primary ${isActive ? 'text-primary' : ''}`}>Journal</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-primary/5 dark:bg-primary/10 rounded-full px-4 py-2 border border-primary/10">
            <span className="material-symbols-outlined text-primary/60 text-xl">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" placeholder="Search products..." type="text"/>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center p-2 hover:bg-primary/10 rounded-full transition-colors">
              <span className="material-symbols-outlined">person</span>
            </button>
            <button className="flex items-center justify-center p-2 hover:bg-primary/10 rounded-full transition-colors relative">
              <span className="material-symbols-outlined">shopping_bag</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
