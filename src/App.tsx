function App() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
              <h1 className="text-xl font-[800] tracking-tighter text-slate-900 dark:text-slate-100 uppercase">Lumière Beauté</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Shop All</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Skincare</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Collections</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Journal</a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-primary/5 dark:bg-primary/10 rounded-full px-4 py-2 border border-primary/10">
              <span className="material-symbols-outlined text-primary/60 text-xl">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="Search products..." type="text"/>
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

      <main className="flex-grow">
        <section className="relative h-[85vh] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(33, 17, 21, 0.7), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBl458feVkemxZYqaf44dTxuOp30gduNr4JKovb6UiNe0HkbRs2TLwFElSltDJ48az0jW0hRovNVttUCRNOOHV9DZ5KDztcLKsuO-aDN6BqXWdnKCEms2SDWtSGsTI2Tl_S1KHSNpOM9sMWYSb3WpwGTTKYcfvsAwT6qwjKLpVD0VxJ3nSl_eAbY9fxEpblG0aH9ibp5zrw9qIYxPyX2BeLGbwekLJAFdAgQIYKi_7Drtr1xIEde100vThPn9nAq07eX0XcqMUKcGUc')`
            }}
          >
          </div>
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
            <div className="max-w-2xl space-y-6">
              <span className="inline-block text-primary font-bold tracking-widest uppercase text-sm">New Arrival: The Solstice Line</span>
              <h2 className="text-5xl md:text-7xl font-[800] leading-tight text-white">Experience the Radiance of Lumière</h2>
              <p className="text-lg text-slate-100/90 leading-relaxed max-w-lg">
                Discover high-performance skincare crafted with rare botanical essences and clinical precision for a timeless, glowing complexion.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:-translate-y-1">
                  Shop The Collection
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-lg font-bold transition-all">
                  Discover Our Story
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-[800] tracking-tight">Featured Collections</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">Curated sets for every skin concern</p>
            </div>
            <a className="group flex items-center gap-2 font-bold text-primary" href="#">
              View All <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200">
                <img alt="The Hydration Series products" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhYPd6R7qM8-FOCG9B3lsd2MSrrkwUJ3fGyTkUoeZRbfkIy0aWkuuGMoHlYSWN4bY3uC00O3asZ9ya0mK1WywbaqFHnl58CR31Zjpxbx_W3AkyFnnCcNDSrmPgYnX5QEjxYjg1j-zsp0a4x_tLq6YPXVnr6S8FOq6RfICoKis0Sc7HilFnLPlyCqvZYmWDaoWu34ugoFystkchBVIUYmZL8lShZ80t12Bfrs2bDSAwjU2pKXxUrdkw-QlvcdPOzr4-pwH1FjZhG23O"/>
              </div>
              <h3 className="mt-4 text-lg font-bold group-hover:text-primary transition-colors">The Hydration Series</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Intense moisture for dewy skin</p>
              <p className="mt-2 font-bold text-primary">$185.00</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200">
                <img alt="Eternal Youth Serum bottle" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1zbibOQb8Ri3z5F-LWfxrHNf4zVg5BzxiqHmnLBdhXumRUytfLyHo1mNlqKbUTYfwE-3DhF1KCDHX0dZOpYNjGrW_DuU6p56eq6c-rGj1GQ1vTHyl0MVgKugwJiXlwdiyv4WTiYPagJRXo-ZKkfSUhx-FP9r_WsfmHbmYizfdZnv0F-jgUUMpH22KatPsxcOGkEkXzZR91qTJ_asFFu3ZMZ9rbzfC4pRdGoRe-rmJCWi4PuUgQotyOrDhkn2p8XkG0EdJl-9cXY2A"/>
              </div>
              <h3 className="mt-4 text-lg font-bold group-hover:text-primary transition-colors">Eternal Youth Serum</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Advanced anti-aging formula</p>
              <p className="mt-2 font-bold text-primary">$120.00</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200">
                <img alt="Radiance Rituals set" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAbHu4IuCLLGzQ6euJdKDjhMsWVlxSMf2_A8e6hdxSjRMnmSAayikwE8vOmEwYurMPdI0ovigL06uFLUGXvZW0NTuQlmxFMjXHnA2lan00LM-k59geVw0mRvFixPI_3ir7m3UZ47fOrz8h-FMOn_nd3UHovvyTsQxrSqF0vmBATsGDT3sD73xkkjljqggrCZDAE0WsCqXJSt4cO6Z9pMnBfGJBOV47_V084o5q1vepmeF308fH0H8tmwn0FYPAcdiGtAf4LQAldzxn"/>
              </div>
              <h3 className="mt-4 text-lg font-bold group-hover:text-primary transition-colors">Radiance Rituals</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Complete glow-enhancing routine</p>
              <p className="mt-2 font-bold text-primary">$240.00</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200">
                <img alt="Pure Balance Cleansers line" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc5aBxPbBTICeI4BG1MyurPngXr0X-iLNwz9obDyWUiIe3wkst9jRvUo-G1MWDeAWHpWyY67bSpd1rkc1vI9luU8tBiyhJ0K-BZ3hVZA6AztCCxFSQ2Lp2Lm6KUzd4GTCCP7UKNOgwlLvCZlnLvO52yF7Y8FHkMQETTHGwBEdYRNW8IivgTH_a2LZS0lD9MLDil8MXVpFeu4AYCJPY_4oGsYNSlePK40GvfjrueAdAEDohRKKlQELUilSJFTyK9M5mFcXGwkq8dnUL"/>
              </div>
              <h3 className="mt-4 text-lg font-bold group-hover:text-primary transition-colors">Pure Balance</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Gentle purification for all skin types</p>
              <p className="mt-2 font-bold text-primary">$65.00</p>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 dark:bg-primary/10 py-24">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img alt="Founder applying skincare" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Fk8_2OCF9cQW_sYORAJMc4RWu9AaTOoNE-MVT5CuJ254d5oTUhI066oWYI4VlwOuYtDXC45-LqYpXq14SIX8ixgqsaraVwAVdNd_xUfjtQbBXQlNwB4fKFmx3-ebqUNVluuh1Cu8oAXirFzFYc-cRR_x1VxjF2cMs6kQhE6_imD5mRueNOiG5Bne8uijnQ5CVpozKyQwmOaRF5PnE_jdB13raxOF_5ESkdKHb0eHi0jFsJmR9LI4UED8A_1BshgrUnIukVtteRz-"/>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl max-w-xs">
                <p className="italic text-slate-600 dark:text-slate-300">"True beauty isn't hidden, it's illuminated from within through conscious care."</p>
                <p className="mt-4 font-bold">— Elena Lumière</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Philosophy</span>
                <h2 className="mt-4 text-4xl md:text-5xl font-[800] leading-tight">The Intersection of Nature & Clinical Science</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Lumière Beauté stands at the forefront of ethical luxury. We believe in total transparency, proven efficacy, and the timeless pursuit of radiant skin. Our formulas are developed over years of research, combining ancient botanical wisdom with modern molecular science.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3 p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-primary/10">
                  <span className="material-symbols-outlined text-primary text-3xl">eco</span>
                  <h4 className="font-bold text-lg">Clean Ingredients</h4>
                  <p className="text-sm text-slate-500">Free from parabens and sulfates, prioritizing purity.</p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-primary/10">
                  <span className="material-symbols-outlined text-primary text-3xl">science</span>
                  <h4 className="font-bold text-lg">Clinical Results</h4>
                  <p className="text-sm text-slate-500">Dermatologist-tested formulas with proven activity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-[800]">Join the Lumière Society</h2>
            <p className="text-slate-600 dark:text-slate-400">Receive exclusive access to new launches, skincare rituals from our experts, and 15% off your first order.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input className="flex-grow px-6 py-4 rounded-lg bg-white dark:bg-slate-800 border border-primary/10 focus:border-primary focus:ring-primary outline-none" placeholder="Enter your email address" type="email"/>
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition-all shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

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
                <li><a className="hover:text-primary transition-colors" href="#">Face Oils</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Serums & Treatments</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Cleansers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Gift Sets</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6">Learn</h3>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-primary transition-colors" href="#">Our Story</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Ingredients Glossary</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Sustainability</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Scientific Research</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6">Support</h3>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-primary transition-colors" href="#">Shipping & Returns</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Find a Boutique</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 uppercase tracking-widest">
            <p>© 2024 Lumière Beauté. All rights reserved.</p>
            <div className="flex gap-8">
              <a className="hover:text-primary" href="#">Privacy Policy</a>
              <a className="hover:text-primary" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
