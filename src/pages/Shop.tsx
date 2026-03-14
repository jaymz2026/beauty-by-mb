import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, type Product } from '../api';

export function Shop() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await api.getProducts(category);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please ensure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

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
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center py-24">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-24 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-dashed border-red-200 text-red-600">
                <p>{error}</p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group">
                    <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
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
