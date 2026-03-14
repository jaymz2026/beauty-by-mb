// Use relative path for API calls to work seamlessly on Vercel
const API_BASE_URL = '/api';

export interface Product {
  id: number;
  name: string;
  category: { name: string } | string;
  price: number;
  image: string;
  description: string;
  purchase_url?: string;
}

export interface JournalPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content?: string;
}

export const api = {
  getProducts: async (category?: string, query?: string): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (query) params.append('q', query);

    const url = `${API_BASE_URL}/products?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id: string | number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  getJournalPosts: async (): Promise<JournalPost[]> => {
    const response = await fetch(`${API_BASE_URL}/journal`);
    if (!response.ok) throw new Error('Failed to fetch journal posts');
    return response.json();
  },

  getJournalPost: async (id: string | number): Promise<JournalPost> => {
    const response = await fetch(`${API_BASE_URL}/journal/${id}`);
    if (!response.ok) throw new Error('Failed to fetch journal post');
    return response.json();
  },

  // Admin / CRUD Methods
  createProduct: async (product: any) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create product');
    }
    return response.json();
  },

  updateProduct: async (id: number, product: Partial<Product>) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete product');
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  createCategory: async (name: string) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create category');
    }
    return response.json();
  },

  deleteCategory: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete category');
  }
};
