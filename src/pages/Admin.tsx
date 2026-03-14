import { useState, useEffect } from 'react';
import { api, type Product } from '../api';

interface Category {
  id: number;
  name: string;
}

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category_id: 0
  });
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [prodData, catData] = await Promise.all([
        api.getProducts(),
        api.getCategories()
      ]);
      setProducts(prodData);
      setCategories(catData);
      if (catData.length > 0) {
        setNewProduct(prev => ({ ...prev, category_id: catData[0].id }));
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.createProduct(newProduct);
      setNewProduct({ name: '', price: 0, description: '', image: '', category_id: categories[0]?.id || 0 });
      fetchData();
    } catch (error) {
      alert('Failed to add product');
    }
  }

  async function handleDeleteProduct(id: number) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        fetchData();
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.createCategory(newCategoryName);
      setNewCategoryName('');
      fetchData();
    } catch (error) {
      alert('Failed to add category');
    }
  }

  async function handleDeleteCategory(id: number) {
    if (window.confirm('Delete category? This might fail if products are linked to it.')) {
      try {
        await api.deleteCategory(id);
        fetchData();
      } catch (error) {
        alert('Failed to delete category. Check if it has products.');
      }
    }
  }

  if (loading) return <div className="p-12 text-center">Loading Admin...</div>;

  return (
    <main className="flex-grow p-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-[800] mb-2">Backoffice Admin</h1>
          <p className="text-slate-500">Manage your products and categories.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Categories Section */}
          <section className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-primary/5">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">category</span>
                Categories
              </h2>

              <form onSubmit={handleAddCategory} className="mb-6 flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New Category..."
                  className="flex-grow bg-slate-50 dark:bg-slate-900 border border-primary/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  required
                />
                <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </form>

              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg group">
                    <span className="text-sm font-medium">{cat.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Products Section */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-primary/5">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inventory_2</span>
                Add New Product
              </h2>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400">Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-primary/10 rounded-lg px-3 py-2 text-sm outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400">Price ($)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(p => ({ ...p, price: parseFloat(e.target.value) }))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-primary/10 rounded-lg px-3 py-2 text-sm outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(p => ({ ...p, description: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-primary/10 rounded-lg px-3 py-2 text-sm outline-none h-20"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400">Image URL</label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct(p => ({ ...p, image: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-primary/10 rounded-lg px-3 py-2 text-sm outline-none"
                    placeholder="https://..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400">Category</label>
                  <select
                    value={newProduct.category_id}
                    onChange={(e) => setNewProduct(p => ({ ...p, category_id: parseInt(e.target.value) }))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-primary/10 rounded-lg px-3 py-2 text-sm outline-none"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 pt-2">
                  <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all">
                    Create Product
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-primary/5">
              <h2 className="text-xl font-bold mb-6">Product Inventory</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold uppercase text-slate-400 border-b border-primary/5">
                      <th className="py-3 px-2">Product</th>
                      <th className="py-3 px-2">Price</th>
                      <th className="py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {products.map(product => (
                      <tr key={product.id} className="text-sm">
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <img src={product.image} className="w-10 h-10 rounded object-cover" alt="" />
                            <span className="font-bold">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2">${product.price.toFixed(2)}</td>
                        <td className="py-4 px-2">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
