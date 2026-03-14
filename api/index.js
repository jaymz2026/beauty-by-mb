import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './lib/supabase.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

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
  const { category, q } = req.query;

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(name)
    `)
    .order('id', { ascending: false });

  if (q) {
    query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
  }

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

router.post('/products', async (req, res) => {
  console.log('Attempting to add product:', req.body);
  const { data, error } = await supabase
    .from('products')
    .insert([req.body])
    .select()
    .single();

  if (error) {
    console.error('Supabase Insert Error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data);
});

router.put('/products/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete('/products/:id', async (req, res) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
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

// Category Routes
router.get('/categories', async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/categories', async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([req.body])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.delete('/categories/:id', async (req, res) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

app.use('/', router);

export default app;
