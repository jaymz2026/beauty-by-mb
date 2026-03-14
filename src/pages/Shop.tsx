import { Link, useParams } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "The Hydration Series",
    category: "Sets",
    price: 185,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhYPd6R7qM8-FOCG9B3lsd2MSrrkwUJ3fGyTkUoeZRbfkIy0aWkuuGMoHlYSWN4bY3uC00O3asZ9ya0mK1WywbaqFHnl58CR31Zjpxbx_W3AkyFnnCcNDSrmPgYnX5QEjxYjg1j-zsp0a4x_tLq6YPXVnr6S8FOq6RfICoKis0Sc7HilFnLPlyCqvZYmWDaoWu34ugoFystkchBVIUYmZL8lShZ80t12Bfrs2bDSAwjU2pKXxUrdkw-QlvcdPOzr4-pwH1FjZhG23O",
    description: "Intense moisture for dewy skin"
  },
  {
    id: 2,
    name: "Eternal Youth Serum",
    category: "Serums",
    price: 120,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1zbibOQb8Ri3z5F-LWfxrHNf4zVg5BzxiqHmnLBdhXumRUytfLyHo1mNlqKbUTYfwE-3DhF1KCDHX0dZOpYNjGrW_DuU6p56eq6c-rGj1GQ1vTHyl0MVgKugwJiXlwdiyv4WTiYPagJRXo-ZKkfSUhx-FP9r_WsfmHbmYizfdZnv0F-jgUUMpH22KatPsxcOGkEkXzZR91qTJ_asFFu3ZMZ9rbzfC4pRdGoRe-rmJCWi4PuUgQotyOrDhkn2p8XkG0EdJl-9cXY2A",
    description: "Advanced anti-aging formula"
  },
  {
    id: 3,
    name: "Radiance Rituals",
    category: "Collections",
    price: 240,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAbHu4IuCLLGzQ6euJdKDjhMsWVlxSMf2_A8e6hdxSjRMnmSAayikwE8vOmEwYurMPdI0ovigL06uFLUGXvZW0NTuQlmxFMjXHnA2lan00LM-k59geVw0mRvFixPI_3ir7m3UZ47fOrz8h-FMOn_nd3UHovvyTsQxrSqF0vmBATsGDT3sD73xkkjljqggrCZDAE0WsCqXJSt4cO6Z9pMnBfGJBOV47_V084o5q1vepmeF308fH0H8tmwn0FYPAcdiGtAf4LQAldzxn",
    description: "Complete glow-enhancing routine"
  },
  {
    id: 4,
    name: "Pure Balance",
    category: "Cleansers",
    price: 65,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc5aBxPbBTICeI4BG1MyurPngXr0X-iLNwz9obDyWUiIe3wkst9jRvUo-G1MWDeAWHpWyY67bSpd1rkc1vI9luU8tBiyhJ0K-BZ3hVZA6AztCCxFSQ2Lp2Lm6KUzd4GTCCP7UKNOgwlLvCZlnLvO52yF7Y8FHkMQETTHGwBEdYRNW8IivgTH_a2LZS0lD9MLDil8MXVpFeu4AYCJPY_4oGsYNSlePK40GvfjrueAdAEDohRKKlQELUilSJFTyK9M5mFcXGwkq8dnUL",
    description: "Gentle purification for all skin types"
  },
  {
    id: 5,
    name: "Midnight Oil",
    category: "Face Oils",
    price: 95,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4Fk8_2OCF9cQW_sYORAJMc4RWu9AaTOoNE-MVT5CuJ254d5oTUhI066oWYI4VlwOuYtDXC45-LqYpXq14SIX8ixgqsaraVwAVdNd_xUfjtQbBXQlNwB4fKFmx3-ebqUNVluuh1Cu8oAXirFzFYc-cRR_x1VxjF2cMs6kQhE6_imD5mRueNOiG5Bne8uijnQ5CVpozKyQwmOaRF5PnE_jdB13raxOF_5ESkdKHb0eHi0jFsJmR9LI4UED8A_1BshgrUnIukVtteRz-",
    description: "Repairing overnight treatment"
  }
];

export function Shop() {
  const { category } = useParams();

  const filteredProducts = category
    ? products.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <main className="flex-grow pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-[800] tracking-tight mb-4">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : "Shop All"}
          </h1>
          <p className="text-slate-500 max-w-2xl">
            Explore our curated selection of high-performance skincare, meticulously crafted to reveal your skin's natural luminosity.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters - Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Categories</h3>
              <ul className="space-y-3">
                <li><Link to="/shop" className={`text-sm hover:text-primary transition-colors ${!category ? 'font-bold text-primary' : 'text-slate-600'}`}>All Products</Link></li>
                <li><Link to="/shop/cleansers" className={`text-sm hover:text-primary transition-colors ${category === 'cleansers' ? 'font-bold text-primary' : 'text-slate-600'}`}>Cleansers</Link></li>
                <li><Link to="/shop/serums" className={`text-sm hover:text-primary transition-colors ${category === 'serums' ? 'font-bold text-primary' : 'text-slate-600'}`}>Serums & Treatments</Link></li>
                <li><Link to="/shop/oils" className={`text-sm hover:text-primary transition-colors ${category === 'oils' ? 'font-bold text-primary' : 'text-slate-600'}`}>Face Oils</Link></li>
                <li><Link to="/shop/sets" className={`text-sm hover:text-primary transition-colors ${category === 'sets' ? 'font-bold text-primary' : 'text-slate-600'}`}>Gift Sets</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Sort By</h3>
              <select className="w-full bg-white dark:bg-slate-800 border border-primary/10 rounded-lg px-4 py-2 text-sm focus:ring-primary outline-none">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group">
                    <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <button className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 py-3 rounded-lg font-bold text-sm opacity-0 transform translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0 backdrop-blur-sm">
                        Quick Add
                      </button>
                    </div>
                    <div className="mt-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-bold group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{product.description}</p>
                      </div>
                      <p className="font-bold text-primary">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-primary/20">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">search_off</span>
                <p className="text-slate-500">No products found in this category.</p>
                <Link to="/shop" className="text-primary font-bold mt-4 inline-block hover:underline">Clear all filters</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
