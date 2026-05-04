import { motion } from 'framer-motion';
import { ArrowLeft, Clock3, MapPin, ShieldCheck, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { computeStockSignal, currentRetailerProfile, wholesalers } from '../data/wholesalers';

const signalBadge = (signal: 'green' | 'orange' | 'red', t: (key: string) => string) => {
  if (signal === 'green') {
    return {
      label: t('greenAvailableLabel'),
      message: t('greenAvailableMessage'),
      dotClass: 'bg-emerald-500',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  }
  if (signal === 'orange') {
    return {
      label: t('orangeLowLabel'),
      message: t('orangeLowMessage'),
      dotClass: 'bg-amber-500',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    };
  }
  return {
    label: t('redLowLabel'),
    message: t('redLowMessage'),
    dotClass: 'bg-rose-500',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
  };
};

const RetailerWholesalerProfile = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const wholesaler = wholesalers.find((entry) => entry.slug === slug);

  if (!wholesaler) {
    return (
      <div className="pt-28 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
        <div className="glass rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-serif text-luxury-dark mb-2">{t('wholesalerNotFound')}</h1>
          <p className="text-luxury-dark/60 mb-6">{t('wholesalerProfileUnavailable')}</p>
          <Link to="/retailer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-dark text-white hover:bg-luxury-gold">
            <ArrowLeft size={16} />
            {t('backToRetailerDashboard')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link to="/retailer" className="inline-flex items-center gap-2 text-sm text-luxury-dark/60 hover:text-luxury-dark mb-4">
          <ArrowLeft size={14} />
          {t('backToDashboard')}
        </Link>
        <div className="glass rounded-3xl p-7 border border-luxury-dark/10 bg-white/60">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div>
              <p className="uppercase text-xs tracking-[0.16em] text-luxury-dark/45">{t('wholesalerProfile')}</p>
              <h1 className="text-3xl md:text-4xl font-serif text-luxury-dark mt-1">{wholesaler.name}</h1>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-luxury-dark/65">
                <span className="inline-flex items-center gap-1"><MapPin size={14} /> {wholesaler.city}</span>
                <span className="inline-flex items-center gap-1"><ShieldCheck size={14} /> {wholesaler.tierAcceptance}</span>
                <span className="inline-flex items-center gap-1"><Clock3 size={14} /> {t('updatedEvery15Minutes')}</span>
              </div>
              <p className="mt-4 text-luxury-dark/75 max-w-3xl leading-relaxed">
                {wholesaler.summary} {t('profileDynamicSummary')}
              </p>
            </div>
            <div className="bg-luxury-dark text-white rounded-2xl px-6 py-4 min-w-[130px] text-center">
              <div className="inline-flex items-center gap-1 text-luxury-gold mb-1">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} />
              </div>
              <p className="text-3xl font-serif leading-tight">{wholesaler.score.toFixed(1)}</p>
              <p className="text-[11px] uppercase tracking-wider opacity-70">{t('trustScore')}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 border border-luxury-dark/10"><p className="text-xs text-luxury-dark/50 uppercase">{t('fulfilled')}</p><p className="font-semibold text-lg text-luxury-dark">{wholesaler.metrics.fulfilledOrders}+</p></div>
            <div className="bg-white rounded-xl p-4 border border-luxury-dark/10"><p className="text-xs text-luxury-dark/50 uppercase">{t('accuracyShort')}</p><p className="font-semibold text-lg text-emerald-600">{wholesaler.metrics.accuracy}%</p></div>
            <div className="bg-white rounded-xl p-4 border border-luxury-dark/10"><p className="text-xs text-luxury-dark/50 uppercase">{t('onTimeLabel')}</p><p className="font-semibold text-lg text-emerald-600">{wholesaler.metrics.onTime}%</p></div>
            <div className="bg-white rounded-xl p-4 border border-luxury-dark/10"><p className="text-xs text-luxury-dark/50 uppercase">{t('disputesShort')}</p><p className="font-semibold text-lg text-rose-600">{wholesaler.metrics.disputes}%</p></div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        {wholesaler.items.map((item) => {
          const signal = computeStockSignal(item.availableUnits, currentRetailerProfile);
          const badge = signalBadge(signal, t);

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl overflow-hidden border border-luxury-dark/10 bg-white/70"
            >
              <img src={item.imageUrl} alt={item.name} className="h-44 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-luxury-dark/50">{item.category}</p>
                <h2 className="font-serif text-xl text-luxury-dark mt-1">{item.name}</h2>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-luxury-dark/70 text-sm">{t('tradePrice')}</p>
                  <p className="font-semibold text-luxury-dark">Rs {item.price}</p>
                </div>
                <div className={`mt-4 flex items-center gap-2 text-xs border rounded-full px-3 py-1.5 w-fit ${badge.badgeClass}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${badge.dotClass}`} />
                  {badge.label}
                </div>
                <p className="mt-3 text-sm text-luxury-dark/65 leading-relaxed">{badge.message}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};

export default RetailerWholesalerProfile;

