import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../context/OrderContext';

const mockProducts = [
  { id: 1, name: 'Premium Assam Tea 500g', category: 'Beverages', signal: 'green', price: '₹240', wholesaler: 'Sharma Bros' },
  { id: 2, name: 'Parle-G Gold 1kg', category: 'FMCG', signal: 'orange', price: '₹120', wholesaler: 'Ramesh Distributors' },
  { id: 3, name: 'Maggi 2-Minute Noodles 12-Pack', category: 'FMCG', signal: 'red', price: '₹168', wholesaler: 'Sharma Bros' },
  { id: 4, name: 'Surf Excel Matic 2kg', category: 'Cleaning', signal: 'green', price: '₹450', wholesaler: 'Ramesh Distributors' },
  { id: 5, name: 'Tata Salt 1kg', category: 'Groceries', signal: 'green', price: '₹25', wholesaler: 'Sharma Bros' },
  { id: 6, name: 'Aashirvaad Atta 5kg', category: 'Groceries', signal: 'orange', price: '₹210', wholesaler: 'Ramesh Distributors' },
];

const RetailerDashboard = () => {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { t } = useTranslation();
  const { orders, placeOrder } = useOrders();

  const handleOrder = (product: any) => {
    placeOrder(product.name, product.id);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const getOrderStatus = (productId: number) => {
    const productOrders = orders.filter(o => o.productId === productId);
    if (productOrders.length === 0) return null;
    return productOrders[0].status; // Latest first
  };

  return (
    <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-serif text-luxury-dark mb-2">{t('retailerDashboard')}</h1>
          <p className="text-luxury-dark/70">{t('retailerWelcome')}</p>
        </div>
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3 border-[#D4AF37]/30 bg-gradient-to-r from-beige-100 to-[#D4AF37]/10">
          <TrendingUp className="text-[#D4AF37]" size={20} />
          <span className="font-serif font-medium text-[#8B6508]">{t('tierGold')}</span>
        </div>
      </motion.div>

      {/* Analytics/Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-luxury-dark/60 mb-2 uppercase tracking-wide">{t('availableStock')}</h3>
          <div className="text-3xl font-serif text-emerald-600">84%</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-luxury-dark/60 mb-2 uppercase tracking-wide">{t('runningLow')}</h3>
          <div className="text-3xl font-serif text-amber-500">12%</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-luxury-dark/60 mb-2 uppercase tracking-wide">{t('outOfStock')}</h3>
          <div className="text-3xl font-serif text-rose-500">4%</div>
        </motion.div>
      </div>

      {/* Stock List */}
      <div className="glass rounded-3xl overflow-hidden mb-12">
        <div className="p-6 border-b border-luxury-dark/10 flex justify-between items-center bg-white/50">
          <h2 className="text-xl font-serif font-medium text-luxury-dark">{t('liveWholesalerStock')}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-dark/40" size={16} />
            <input type="text" placeholder={t('searchProducts')} className="pl-10 pr-4 py-2 rounded-full border border-luxury-dark/10 bg-white text-sm focus:outline-none focus:border-luxury-gold/50" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige-50/50 text-luxury-dark/60 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">{t('product')}</th>
                <th className="p-4 font-medium">{t('wholesaler')}</th>
                <th className="p-4 font-medium">{t('price')}</th>
                <th className="p-4 font-medium">{t('availabilitySignal')}</th>
                <th className="p-4 font-medium text-right">{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id} className="border-t border-luxury-dark/5 hover:bg-white/40 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-luxury-dark">{product.name}</div>
                    <div className="text-xs text-luxury-dark/50">{product.category}</div>
                  </td>
                  <td className="p-4 text-luxury-dark/80 text-sm">{product.wholesaler}</td>
                  <td className="p-4 text-luxury-dark/80">{product.price}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        product.signal === 'green' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                        product.signal === 'orange' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 
                        'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                      }`} />
                      <span className="text-sm text-luxury-dark/70 capitalize">{product.signal === 'green' ? t('high') : product.signal === 'orange' ? t('low') : t('critical')}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleOrder(product)}
                      disabled={product.signal === 'red' || getOrderStatus(product.id) === 'pending' || getOrderStatus(product.id) === 'accepted'}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        product.signal === 'red' 
                          ? 'bg-luxury-dark/5 text-luxury-dark/30 cursor-not-allowed' 
                          : getOrderStatus(product.id) === 'pending'
                          ? 'bg-amber-100 text-amber-700 cursor-not-allowed'
                          : getOrderStatus(product.id) === 'accepted'
                          ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed'
                          : 'bg-luxury-dark text-white hover:bg-luxury-gold'
                      }`}
                    >
                      {getOrderStatus(product.id) === 'pending' 
                        ? 'Pending...' 
                        : getOrderStatus(product.id) === 'accepted' 
                        ? 'Accepted' 
                        : t('orderNow')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast */}
      {orderSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 glass bg-emerald-50 border-emerald-200 text-emerald-800 px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg z-50"
        >
          <CheckCircle size={20} className="text-emerald-500" />
          <span>{t('orderSuccess')}</span>
        </motion.div>
      )}
    </div>
  );
};

export default RetailerDashboard;
