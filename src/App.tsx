import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Journal } from './pages/Journal';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Placeholder for Collections
const Collections = () => <div className="p-24 text-center">Collections Page (Coming Soon)</div>;

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { session, isAdmin, loading } = useAuth();

  if (loading) return <div className="p-24 text-center">Checking authorization...</div>;
  if (!session || !isAdmin) return <Navigate to="/login" />;

  // You can decide if MFA is mandatory for the UI here
  // if (!isMfaEnabled) return <Navigate to="/admin/setup-mfa" />;

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <Admin />
                </AdminGuard>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
