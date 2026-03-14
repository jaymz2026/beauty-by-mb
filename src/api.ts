// Use relative path for API calls to work seamlessly on Vercel
const API_BASE_URL = '/api';

export const api = {
  getProducts: async (category?: string) => {
    const url = category
      ? `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/products`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id: string | number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  getJournalPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/journal`);
    if (!response.ok) throw new Error('Failed to fetch journal posts');
    return response.json();
  },

  getJournalPost: async (id: string | number) => {
    const response = await fetch(`${API_BASE_URL}/journal/${id}`);
    if (!response.ok) throw new Error('Failed to fetch journal post');
    return response.json();
  }
};
