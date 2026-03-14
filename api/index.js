const express = require('express');
const cors = require('cors');
const { supabase } = require('./lib/supabase');

const app = express();
app.use(cors());
app.use(express.json());

// Product Routes
app.get('/api/products', async (req, res) => {
  const { category } = req.query;

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(name)
    `)
    .order('id', { ascending: false });

  if (category) {
    // Note: This assumes category name filtering
    // In a real scenario, you might want to join and filter by category name
    const { data: catData } = await supabase
      .from('categories')
      .select('id')
      .ilike('name', category)
      .single();

    if (catData) {
      query = query.eq('category_id', catData.id);
    }
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/products/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name)
    `)
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Product not found' });
  res.json(data);
});

// Journal Routes
app.get('/api/journal', async (req, res) => {
  const { data, error } = await supabase
    .from('journal_posts')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/journal/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Post not found' });
  res.json(data);
});

// Export for Vercel
module.exports = app;

// Start server if run directly (for local testing)
if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
