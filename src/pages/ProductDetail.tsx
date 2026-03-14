import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, type Product } from '../api';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await api.getProduct(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Product not found.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="flex justify-center py-48">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error || !product) return (
    <div className="text-center py-48">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <Link to="/shop" className="text-primary font-bold">Back to Shop</Link>
    </div>
  );

  return (
    <main className="flex-grow pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary">{typeof product.category === 'object' ? product.category.name : product.category}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-[800] tracking-tight mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mb-8">${product.price.toFixed(2)}</p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
              {product.description}. Formulated with our signature botanical complex and clinically-proven active ingredients to deliver visible results while maintaining skin health.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={product.purchase_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:-translate-y-1 text-center"
              >
                Purchase
              </a>
              <button className="flex items-center justify-center border border-primary/20 hover:border-primary px-4 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-primary">favorite</span>
              </button>
            </div>

            <div className="space-y-6 border-t border-primary/10 pt-8">
              <details className="group" open>
                <summary className="flex items-center justify-between font-bold cursor-pointer list-none">
                  <span>Benefits</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="pt-4 text-slate-500 text-sm leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Deeply hydrates and locks in moisture for 24 hours</li>
                    <li>Improves skin elasticity and firmness</li>
                    <li>Calms redness and reduces inflammation</li>
                    <li>Suitable for all skin types, including sensitive skin</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between font-bold cursor-pointer list-none">
                  <span>How to Use</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="pt-4 text-slate-500 text-sm leading-relaxed">
                  Apply 2-3 drops to clean, damp skin morning and night. Gently press into face and neck until fully absorbed. Follow with your favorite moisturizer.
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between font-bold cursor-pointer list-none">
                  <span>Key Ingredients</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="pt-4 text-slate-500 text-sm leading-relaxed">
                  Hyaluronic Acid, Vitamin B5, Squalane, and our proprietary Radiant Botanical Blend.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
