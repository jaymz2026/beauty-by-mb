import express from 'express';
import cors from 'cors';
import { supabase } from './lib/supabase.js';

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

// Health check / Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'API is working',
    env: {
      url: !!process.env.SUPABASE_URL,
      key: !!process.env.SUPABASE_ANON_KEY
    }
  });
});

// Product Routes
router.get('/products', async (req, res) => {
  const { category } = req.query;

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(name)
    `)
    .order('id', { ascending: false });

  if (category) {
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

router.get('/products/:id', async (req, res) => {
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
router.get('/journal', async (req, res) => {
  const { data, error } = await supabase
    .from('journal_posts')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/journal/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Post not found' });
  res.json(data);
});

app.use('/api', router);

export default app;
