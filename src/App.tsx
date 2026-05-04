import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import RetailerDashboard from './pages/RetailerDashboard';
import RetailerWholesalerProfile from './pages/RetailerWholesalerProfile';
import WholesalerDashboard from './pages/WholesalerDashboard';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="min-h-screen bg-beige-50 text-luxury-dark font-sans selection:bg-luxury-gold selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/retailer" element={<RetailerDashboard />} />
            <Route path="/retailer/:slug" element={<RetailerWholesalerProfile />} />
            <Route path="/wholesaler" element={<WholesalerDashboard />} />
          </Routes>
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;
