import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Journal } from './pages/Journal';

// Placeholder for Collections
const Collections = () => <div className="p-24 text-center">Collections Page (Coming Soon)</div>;

function App() {
  return (
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
