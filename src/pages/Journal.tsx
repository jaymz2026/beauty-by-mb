import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export function Journal() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await api.getJournalPosts();
        setArticles(data);
        setError(null);
      } catch (err) {
        setError('Failed to load journal posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="flex-grow pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-5xl font-[800] tracking-tight mb-6">The Journal</h1>
          <p className="text-slate-500 text-lg">
            Insights into botanical science, skincare rituals, and the pursuit of conscious beauty.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-24 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
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
        )}
      </div>
    </main>
  );
}
