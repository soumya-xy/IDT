import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock3, Search, ShieldCheck, Store, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { computeStockSignal, currentRetailerProfile, wholesalers } from '../data/wholesalers';

const mockProducts = [
  { id: 1, name: 'Premium Assam Tea 500g', category: 'Beverages', price: 240, wholesaler: 'Sharma Bros', trustScore: 4.6 },
  { id: 2, name: 'Parle-G Gold 1kg', category: 'FMCG', price: 120, wholesaler: 'Ramesh Distributors', trustScore: 4.3 },
  { id: 3, name: 'Maggi 2-Minute Noodles 12-Pack', category: 'FMCG', price: 168, wholesaler: 'Sharma Bros', trustScore: 4.6 },
  { id: 4, name: 'Surf Excel Matic 2kg', category: 'Cleaning', price: 450, wholesaler: 'Ramesh Distributors', trustScore: 4.3 },
  { id: 5, name: 'Tata Salt 1kg', category: 'Groceries', price: 25, wholesaler: 'Sharma Bros', trustScore: 4.6 },
  { id: 6, name: 'Aashirvaad Atta 5kg', category: 'Groceries', price: 210, wholesaler: 'Ramesh Distributors', trustScore: 4.3 },
] as const;

const RetailerDashboard = () => {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'green' | 'orange' | 'red'>('all');
  const [activeIssueOrderId, setActiveIssueOrderId] = useState<string | null>(null);
  const [issueReason, setIssueReason] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orders, placeOrder, updateOrderStatus } = useOrders();

  const handleOrder = (product: (typeof mockProducts)[number]) => {
    placeOrder(product.name, product.id);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const getOrderStatus = (productId: number) => {
    const productOrders = orders.filter(o => o.productId === productId);
    if (productOrders.length === 0) return null;
    return productOrders[0].status; // Latest first
  };

  const productsWithSignal = useMemo(() => {
    return mockProducts.map((product) => {
      const sourceWholesaler = wholesalers.find((w) => w.name === product.wholesaler);
      const sourceItem = sourceWholesaler?.items.find((item) => item.name === product.name);
      const signal = computeStockSignal(sourceItem?.availableUnits ?? 0, currentRetailerProfile);
      return { ...product, signal };
    });
  }, []);

  const filteredProducts = useMemo(() => {
    return productsWithSignal.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.wholesaler.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSignal = statusFilter === 'all' || product.signal === statusFilter;
      return matchesSearch && matchesSignal;
    });
  }, [productsWithSignal, searchQuery, statusFilter]);

  const wholesalerCards = useMemo(
    () =>
      wholesalers.map((wholesaler) => ({
        ...wholesaler,
        openRedSignals: wholesaler.items.filter((item) => computeStockSignal(item.availableUnits, currentRetailerProfile) === 'red').length,
        openOrangeSignals: wholesaler.items.filter((item) => computeStockSignal(item.availableUnits, currentRetailerProfile) === 'orange').length,
      })),
    []
  );

  const activeOrders = orders.filter(
    (order) => order.status === 'accepted' || order.status === 'dispatched' || order.status === 'delivered' || order.status === 'disputed'
  );

  const statusBadge = (status: string) => {
    if (status === 'accepted') return 'bg-sky-100 text-sky-700 border-sky-200';
    if (status === 'dispatched') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (status === 'delivered') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status === 'disputed') return 'bg-rose-100 text-rose-700 border-rose-200';
    return 'bg-luxury-dark/10 text-luxury-dark/60 border-luxury-dark/10';
  };

  const formatSignal = (signal: 'green' | 'orange' | 'red') => {
    if (signal === 'green') return t('high');
    if (signal === 'orange') return t('low');
    return t('critical');
  };

  const handleReportIssue = (orderId: string) => {
    if (!issueReason.trim()) return;
    updateOrderStatus(orderId, 'disputed', issueReason.trim());
    setIssueReason('');
    setActiveIssueOrderId(null);
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

      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        {wholesalerCards.map((card) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/retailer/${card.slug}`)}
            className="glass rounded-2xl p-6 border border-luxury-dark/10 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-luxury-dark/50">Wholesaler Trust Profile</p>
                <h3 className="text-xl font-serif text-luxury-dark mt-1">{card.name}</h3>
              </div>
              <div className="bg-luxury-dark text-white rounded-xl px-4 py-2 text-center min-w-[84px]">
                <p className="font-serif text-2xl leading-tight">{card.score}</p>
                <p className="text-[10px] uppercase tracking-wider opacity-70">Score</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div><p className="text-luxury-dark/50">Fulfilled</p><p className="font-semibold text-luxury-dark">{card.metrics.fulfilledOrders}+</p></div>
              <div><p className="text-luxury-dark/50">Accuracy</p><p className="font-semibold text-emerald-600">{card.metrics.accuracy}%</p></div>
              <div><p className="text-luxury-dark/50">On-time</p><p className="font-semibold text-emerald-600">{card.metrics.onTime}%</p></div>
              <div><p className="text-luxury-dark/50">Disputes</p><p className="font-semibold text-rose-600">{card.metrics.disputes}%</p></div>
            </div>
            <div className="mt-3 flex gap-2 text-[11px]">
              <span className="px-2 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100">{card.openRedSignals} red signals</span>
              <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">{card.openOrangeSignals} orange signals</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#8B6508] bg-luxury-gold/10 border border-luxury-gold/20 rounded-lg px-3 py-2">
              <ShieldCheck size={14} />
              Tier acceptance: {card.tierAcceptance}. Click to view live catalog.
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stock List */}
      <div className="glass rounded-3xl overflow-hidden mb-12">
        <div className="p-6 border-b border-luxury-dark/10 flex flex-col md:flex-row md:justify-between md:items-center gap-3 bg-white/50">
          <h2 className="text-xl font-serif font-medium text-luxury-dark">{t('liveWholesalerStock')}</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-dark/40" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchProducts')}
                className="pl-10 pr-4 py-2 rounded-full border border-luxury-dark/10 bg-white text-sm focus:outline-none focus:border-luxury-gold/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'green' | 'orange' | 'red')}
              className="px-4 py-2 rounded-full border border-luxury-dark/10 bg-white text-sm text-luxury-dark/70 focus:outline-none focus:border-luxury-gold/50"
            >
              <option value="all">All signals</option>
              <option value="green">Green</option>
              <option value="orange">Orange</option>
              <option value="red">Red</option>
            </select>
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
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-luxury-dark/5 hover:bg-white/40 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-luxury-dark">{product.name}</div>
                    <div className="text-xs text-luxury-dark/50">{product.category}</div>
                  </td>
                  <td className="p-4 text-luxury-dark/80 text-sm">{product.wholesaler}</td>
                  <td className="p-4 text-luxury-dark/80">₹{product.price}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        product.signal === 'green' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                        product.signal === 'orange' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 
                        'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                      }`} />
                      <span className="text-sm text-luxury-dark/70 capitalize">{formatSignal(product.signal)}</span>
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
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-luxury-dark/50 text-sm">
                    No products match your search/filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden mb-12 bg-white/60">
        <div className="p-6 border-b border-luxury-dark/10 flex items-center justify-between">
          <h2 className="text-xl font-serif text-luxury-dark flex items-center gap-2">
            <Store size={20} className="text-luxury-accent" />
            Order Lifecycle Tracker
          </h2>
          <span className="text-xs uppercase tracking-wide text-luxury-dark/50">{activeOrders.length} active orders</span>
        </div>
        <div className="p-6 space-y-4">
          {activeOrders.length === 0 && (
            <p className="text-sm text-luxury-dark/50">No active orders in transit.</p>
          )}
          {activeOrders.map((order) => (
            <div key={order.id} className="border border-luxury-dark/10 bg-white rounded-2xl p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-luxury-dark">{order.id}</p>
                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${statusBadge(order.status)}`}>{order.status}</span>
                  </div>
                  <p className="text-sm text-luxury-dark/80">{order.items}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-luxury-dark/50">
                    <span className="inline-flex items-center gap-1"><Clock3 size={12} />Placed: {order.timeline.placedAt}</span>
                    {order.timeline.acceptedAt && <span>Accepted: {order.timeline.acceptedAt}</span>}
                    {order.timeline.dispatchedAt && <span>Dispatched: {order.timeline.dispatchedAt}</span>}
                    {order.timeline.deliveredAt && <span>Delivered: {order.timeline.deliveredAt}</span>}
                  </div>
                  {order.issueReason && (
                    <div className="mt-3 text-xs text-rose-700 bg-rose-50 border border-rose-100 px-3 py-2 rounded-lg inline-flex items-center gap-2">
                      <AlertTriangle size={14} />
                      Issue: {order.issueReason}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {order.status === 'dispatched' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium"
                    >
                      Confirm Receipt
                    </button>
                  )}
                  {(order.status === 'dispatched' || order.status === 'delivered') && (
                    <button
                      onClick={() => setActiveIssueOrderId(activeIssueOrderId === order.id ? null : order.id)}
                      className="px-4 py-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-sm font-medium"
                    >
                      Report Issue
                    </button>
                  )}
                </div>
              </div>
              {activeIssueOrderId === order.id && (
                <div className="mt-4 pt-4 border-t border-luxury-dark/10">
                  <label className="text-xs text-luxury-dark/60 block mb-2">Describe the problem (quantity mismatch, damage, wrong SKU):</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={issueReason}
                      onChange={(e) => setIssueReason(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm rounded-lg border border-luxury-dark/10 focus:outline-none focus:border-luxury-gold/40"
                      placeholder="e.g. 12 packs missing from total quantity"
                    />
                    <button
                      onClick={() => handleReportIssue(order.id)}
                      className="px-4 py-2 rounded-lg bg-luxury-dark text-white text-sm hover:bg-luxury-gold"
                    >
                      Submit Dispute
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
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
