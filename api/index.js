import express from 'express';
import cors from 'cors';
import { supabase, createAuthenticatedClient } from './lib/supabase.js';

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

// Middleware to verify Admin + MFA
const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  const sb = createAuthenticatedClient(token);
  const { data: { user }, error } = await sb.auth.getUser();

  if (error || !user) return res.status(401).json({ error: 'Invalid token' });

  const { data: profile } = await sb
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) return res.status(403).json({ error: 'Forbidden: Admin access required' });

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(Buffer.from(base64, 'base64').toString());

  if (payload.aal !== 'aal2') {
    return res.status(403).json({ error: 'MFA required' });
  }

  req.user = user;
  req.sb = sb;
  next();
};

// Routes on the router
router.get('/test', (req, res) => {
  res.json({
    message: 'API is working',
    env: {
      url: !!process.env.SUPABASE_URL,
      key: !!process.env.SUPABASE_ANON_KEY
    }
  });
});

router.get('/products', async (req, res) => {
  const { category, q } = req.query;
  let query = supabase
    .from('products')
    .select('*, category:categories(name)')
    .order('created_at', { ascending: false });

  if (q) query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);

  if (category) {
    const { data: catData } = await supabase.from('categories').select('id').ilike('name', category).single();
    if (catData) query = query.eq('category_id', catData.id);
  }

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/products', adminAuth, async (req, res) => {
  const { data, error } = await req.sb.from('products').insert([req.body]).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put('/products/:id', adminAuth, async (req, res) => {
  const { data, error } = await req.sb.from('products').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete('/products/:id', adminAuth, async (req, res) => {
  const { error } = await req.sb.from('products').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

router.get('/products/:id', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*, category:categories(name)').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: 'Product not found' });
  res.json(data);
});

router.get('/journal', async (req, res) => {
  const { data, error } = await supabase.from('journal_posts').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/journal/:id', async (req, res) => {
  const { data, error } = await supabase.from('journal_posts').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: 'Post not found' });
  res.json(data);
});

router.get('/categories', async (req, res) => {
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/categories', adminAuth, async (req, res) => {
  const { data, error } = await req.sb.from('categories').insert([req.body]).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.delete('/categories/:id', adminAuth, async (req, res) => {
  const { error } = await req.sb.from('categories').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

// Mount router on /api
app.use('/api', router);

export default app;
