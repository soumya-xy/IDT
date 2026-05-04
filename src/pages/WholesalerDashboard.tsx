
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Bell, Check, CheckCircle, Clock, PackageCheck, Star, Truck, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../context/OrderContext';

const WholesalerDashboard = () => {
  const { t } = useTranslation();
  const { orders, updateOrderStatus } = useOrders();

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const acceptedOrders = orders.filter(o => o.status === 'accepted');
  const dispatchedOrders = orders.filter(o => o.status === 'dispatched');
  const disputedOrders = orders.filter(o => o.status === 'disputed');
  const deliveredCount = orders.filter(o => o.status === 'delivered' || o.status === 'resolved').length;
  const resolvedDisputes = orders.filter(o => o.status === 'resolved').length;
  const totalDisputes = disputedOrders.length + resolvedDisputes;
  const disputeRate = orders.length === 0 ? 0 : (totalDisputes / orders.length) * 100;
  const onTimeRate = orders.length === 0 ? 0 : (dispatchedOrders.length + deliveredCount) / orders.length * 100;
  const accuracyRate = Math.max(88, 100 - disputeRate * 2.2);
  const trustScore = Math.max(3.2, Math.min(5, 2 + (accuracyRate * 0.45 + onTimeRate * 0.35 + (100 - disputeRate * 4) * 0.2) / 100 * 3));

  const handleAction = (id: string, action: 'accept' | 'decline') => {
    updateOrderStatus(id, action === 'accept' ? 'accepted' : 'declined');
  };

  return (
    <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-serif text-luxury-dark mb-2">{t('wholesalerPortal')}</h1>
        <p className="text-luxury-dark/70">{t('wholesalerDesc')}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Trust Score Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1"
        >
          <div className="glass p-8 rounded-3xl sticky top-28 bg-white/40">
            <h2 className="text-xl font-serif text-luxury-dark mb-6 flex items-center gap-2">
              <PackageCheck className="text-luxury-gold" />
              {t('yourTrustProfile')}
            </h2>
            
            <div className="text-center mb-8 pb-8 border-b border-luxury-dark/10">
              <div className="text-5xl font-serif text-luxury-gold mb-2">{trustScore.toFixed(1)}</div>
              <div className="text-xs uppercase tracking-widest text-luxury-dark/60 font-medium">{t('overallScore')}</div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-luxury-dark/70">{t('accuracyRate')}</span>
                  <span className="font-semibold text-emerald-600">{accuracyRate.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 w-full bg-luxury-dark/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${accuracyRate}%` }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-luxury-dark/70">{t('onTimeRate')}</span>
                  <span className="font-semibold text-emerald-600">{onTimeRate.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 w-full bg-luxury-dark/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${onTimeRate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-luxury-dark/70">{t('disputeRateLabel')}</span>
                  <span className="font-semibold text-rose-500">{disputeRate.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 w-full bg-luxury-dark/5 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400" style={{ width: `${Math.min(disputeRate, 100)}%` }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 text-xs">
              <div className="bg-white/60 rounded-lg border border-luxury-dark/10 px-3 py-2">
                <p className="text-luxury-dark/50 uppercase tracking-wide">Fulfilled</p>
                <p className="font-semibold text-luxury-dark mt-0.5">{deliveredCount}</p>
              </div>
              <div className="bg-white/60 rounded-lg border border-luxury-dark/10 px-3 py-2">
                <p className="text-luxury-dark/50 uppercase tracking-wide">Open Disputes</p>
                <p className="font-semibold text-rose-600 mt-0.5">{disputedOrders.length}</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-luxury-gold/10 rounded-xl border border-luxury-gold/20 flex items-start gap-3">
              <AlertTriangle size={18} className="text-[#8B6508] mt-0.5 shrink-0" />
              <p className="text-xs text-[#8B6508] leading-relaxed">
                {t('maintainAccuracy')} <span className="font-semibold">{t('goldPreferred')}</span>{t('statusLabel')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Orders Queue */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <div className="glass rounded-3xl overflow-hidden flex flex-col h-full bg-white/60">
            <div className="p-6 border-b border-luxury-dark/10 flex justify-between items-center bg-white/40">
              <h2 className="text-xl font-serif font-medium text-luxury-dark flex items-center gap-2">
                <Bell size={20} className="text-luxury-accent" />
                {t('incomingRequests')}
              </h2>
              <span className="px-3 py-1 bg-luxury-dark text-white text-xs rounded-full">{pendingOrders.length} {t('pendingCount')}</span>
            </div>

            <div className="p-6 space-y-4 flex-1">
              <AnimatePresence>
                {pendingOrders.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                    className="h-full min-h-[300px] flex flex-col items-center justify-center text-luxury-dark/40"
                  >
                    <CheckCircle size={48} className="mb-4 opacity-50" />
                    <p>{t('allCaughtUp')}</p>
                  </motion.div>
                ) : (
                  pendingOrders.map((order) => (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                      className="p-5 border border-luxury-dark/10 rounded-2xl bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-luxury-dark">{order.retailer}</h3>
                            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${
                              order.tier === 'Gold' ? 'bg-[#D4AF37]/20 text-[#8B6508] border border-[#D4AF37]/30' :
                              order.tier === 'Silver' ? 'bg-gray-200 text-gray-700 border border-gray-300' :
                              'bg-[#CD7F32]/20 text-[#8B4513] border border-[#CD7F32]/30'
                            }`}>
                              {order.tier}
                            </span>
                          </div>
                          <p className="text-luxury-dark/80 text-sm mb-2">{order.items}</p>
                          <div className="flex items-center gap-1 text-xs text-luxury-dark/50">
                            <Clock size={12} />
                            {order.id} • {order.time}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleAction(order.id, 'decline')}
                            className="px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                          >
                            <X size={16} />
                            {t('decline')}
                          </button>
                          <button 
                            onClick={() => handleAction(order.id, 'accept')}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                          >
                            <Check size={16} />
                            {t('accept')}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass rounded-3xl overflow-hidden bg-white/60 mt-6">
            <div className="p-6 border-b border-luxury-dark/10 flex justify-between items-center bg-white/40">
              <h2 className="text-xl font-serif font-medium text-luxury-dark flex items-center gap-2">
                <Truck size={20} className="text-amber-600" />
                Dispatch Control
              </h2>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">{acceptedOrders.length + dispatchedOrders.length} active</span>
            </div>
            <div className="p-6 space-y-3">
              {[...acceptedOrders, ...dispatchedOrders].length === 0 && (
                <p className="text-sm text-luxury-dark/50">No accepted orders waiting for dispatch.</p>
              )}
              {[...acceptedOrders, ...dispatchedOrders].map((order) => (
                <div key={order.id} className="border border-luxury-dark/10 rounded-xl p-4 bg-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="font-semibold text-luxury-dark">{order.id} - {order.retailer}</p>
                      <p className="text-sm text-luxury-dark/70">{order.items}</p>
                    </div>
                    {order.status === 'accepted' ? (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'dispatched')}
                        className="px-4 py-2 rounded-full bg-luxury-dark text-white hover:bg-luxury-gold text-sm"
                      >
                        Mark Dispatched
                      </button>
                    ) : (
                      <span className="text-xs text-amber-700 bg-amber-100 px-3 py-1 rounded-full">In Transit</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl overflow-hidden bg-white/60 mt-6 mb-4">
            <div className="p-6 border-b border-luxury-dark/10 flex justify-between items-center bg-white/40">
              <h2 className="text-xl font-serif font-medium text-luxury-dark flex items-center gap-2">
                <Star size={20} className="text-rose-500" />
                Dispute Resolution (24h Window)
              </h2>
              <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs rounded-full">{disputedOrders.length} open</span>
            </div>
            <div className="p-6 space-y-3">
              {disputedOrders.length === 0 && (
                <div className="text-sm text-luxury-dark/50">No open disputes. Keep maintaining high fulfilment quality.</div>
              )}
              {disputedOrders.map((order) => (
                <div key={order.id} className="border border-rose-200 rounded-xl p-4 bg-rose-50/40">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="font-semibold text-luxury-dark">{order.id} - {order.retailer}</p>
                      <p className="text-sm text-luxury-dark/70">{order.items}</p>
                      {order.issueReason && (
                        <p className="text-xs text-rose-700 mt-1">Issue: {order.issueReason}</p>
                      )}
                      <p className="text-[11px] text-rose-700/80 mt-1 inline-flex items-center gap-1">
                        <Clock size={12} /> Auto-penalty if unresolved after 24h
                      </p>
                    </div>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'resolved')}
                      className="px-4 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 text-sm inline-flex items-center gap-1"
                    >
                      <Check size={14} />
                      Mark Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WholesalerDashboard;
