import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "The Science of Glowing Skin",
    excerpt: "Discover the molecular mechanisms that drive skin radiance and how clinical ingredients can amplify your natural glow.",
    category: "Science",
    date: "Dec 12, 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4Fk8_2OCF9cQW_sYORAJMc4RWu9AaTOoNE-MVT5CuJ254d5oTUhI066oWYI4VlwOuYtDXC45-LqYpXq14SIX8ixgqsaraVwAVdNd_xUfjtQbBXQlNwB4fKFmx3-ebqUNVluuh1Cu8oAXirFzFYc-cRR_x1VxjF2cMs6kQhE6_imD5mRueNOiG5Bne8uijnQ5CVpozKyQwmOaRF5PnE_jdB13raxOF_5ESkdKHb0eHi0jFsJmR9LI4UED8A_1BshgrUnIukVtteRz-"
  },
  {
    id: 2,
    title: "Winter Skincare Rituals",
    excerpt: "Adapt your routine for the colder months with our expert guide to maintaining hydration and barrier protection.",
    category: "Rituals",
    date: "Nov 28, 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl458feVkemxZYqaf44dTxuOp30gduNr4JKovb6UiNe0HkbRs2TLwFElSltDJ48az0jW0hRovNVttUCRNOOHV9DZ5KDztcLKsuO-aDN6BqXWdnKCEms2SDWtSGsTI2Tl_S1KHSNpOM9sMWYSb3WpwGTTKYcfvsAwT6qwjKLpVD0VxJ3nSl_eAbY9fxEpblG0aH9ibp5zrw9qIYxPyX2BeLGbwekLJAFdAgQIYKi_7Drtr1xIEde100vThPn9nAq07eX0XcqMUKcGUc"
  }
];

export function Journal() {
  return (
    <main className="flex-grow pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-5xl font-[800] tracking-tight mb-6">The Journal</h1>
          <p className="text-slate-500 text-lg">
            Insights into botanical science, skincare rituals, and the pursuit of conscious beauty.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-6">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-slate-400">{article.date}</span>
                </div>
                <h2 className="text-2xl font-[800] group-hover:text-primary transition-colors">{article.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {article.excerpt}
                </p>
                <Link to={`/journal/${article.id}`} className="inline-flex items-center gap-2 font-bold text-primary group-hover:underline">
                  Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
