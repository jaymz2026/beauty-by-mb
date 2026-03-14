import { useParams, Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "The Hydration Series",
    category: "Sets",
    price: 185,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhYPd6R7qM8-FOCG9B3lsd2MSrrkwUJ3fGyTkUoeZRbfkIy0aWkuuGMoHlYSWN4bY3uC00O3asZ9ya0mK1WywbaqFHnl58CR31Zjpxbx_W3AkyFnnCcNDSrmPgYnX5QEjxYjg1j-zsp0a4x_tLq6YPXVnr6S8FOq6RfICoKis0Sc7HilFnLPlyCqvZYmWDaoWu34ugoFystkchBVIUYmZL8lShZ80t12Bfrs2bDSAwjU2pKXxUrdkw-QlvcdPOzr4-pwH1FjZhG23O",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAbHu4IuCLLGzQ6euJdKDjhMsWVlxSMf2_A8e6hdxSjRMnmSAayikwE8vOmEwYurMPdI0ovigL06uFLUGXvZW0NTuQlmxFMjXHnA2lan00LM-k59geVw0mRvFixPI_3ir7m3UZ47fOrz8h-FMOn_nd3UHovvyTsQxrSqF0vmBATsGDT3sD73xkkjljqggrCZDAE0WsCqXJSt4cO6Z9pMnBfGJBOV47_V084o5q1vepmeF308fH0H8tmwn0FYPAcdiGtAf4LQAldzxn"
    ],
    description: "Our signature hydration collection designed to drench your skin in moisture and lock it in for 24-hour radiance. This set includes our Gentle Foam Cleanser, Hyaluronic Serum, and Barrier Repair Cream.",
    benefits: [
      "Deeply hydrates and plumps",
      "Strengthens the skin's natural moisture barrier",
      "Leaves skin with a dewy, healthy glow",
      "Suitable for all skin types, including sensitive"
    ],
    ingredients: "Hyaluronic Acid, Ceramides, Rosehip Oil, Aloe Vera, Vitamin B5."
  },
  {
    id: 2,
    name: "Eternal Youth Serum",
    category: "Serums",
    price: 120,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1zbibOQb8Ri3z5F-LWfxrHNf4zVg5BzxiqHmnLBdhXumRUytfLyHo1mNlqKbUTYfwE-3DhF1KCDHX0dZOpYNjGrW_DuU6p56eq6c-rGj1GQ1vTHyl0MVgKugwJiXlwdiyv4WTiYPagJRXo-ZKkfSUhx-FP9r_WsfmHbmYizfdZnv0F-jgUUMpH22KatPsxcOGkEkXzZR91qTJ_asFFu3ZMZ9rbzfC4pRdGoRe-rmJCWi4PuUgQotyOrDhkn2p8XkG0EdJl-9cXY2A"
    ],
    description: "An advanced age-defying serum powered by plant-based stem cells and clinical peptides to visibly reduce fine lines and firm the skin.",
    benefits: [
      "Smooths fine lines and wrinkles",
      "Improves skin elasticity",
      "Evens skin tone and texture",
      "Provides antioxidant protection"
    ],
    ingredients: "Swiss Apple Stem Cells, Matrixyl 3000, Vitamin C, Ferulic Acid."
  }
];

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];

  return (
    <main className="flex-grow pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-12">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer border-2 border-transparent hover:border-primary transition-all">
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs">{product.category}</span>
              <h1 className="text-4xl font-[800] tracking-tight mt-2">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mt-4">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4">
              <h3 className="font-bold">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-grow bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:-translate-y-1">
                Add To Bag
              </button>
              <button className="flex items-center justify-center p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            <div className="border-t border-primary/10 pt-8 mt-8 space-y-6">
              <details className="group" open>
                <summary className="flex items-center justify-between font-bold cursor-pointer list-none">
                  Ingredients
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  {product.ingredients}
                </p>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between font-bold cursor-pointer list-none">
                  How To Use
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  Apply 2-3 drops to clean, dry skin. Massage gently in upward circular motions until fully absorbed. Use morning and night for best results.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
