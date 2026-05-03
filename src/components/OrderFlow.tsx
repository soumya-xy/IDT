import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, CheckCircle, Truck, PackageCheck, AlertTriangle } from 'lucide-react';

const OrderFlow = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const steps = [
    { icon: <ShoppingCart size={24} />, labelKey: 'reqStep' },
    { icon: <CheckCircle size={24} />, labelKey: 'accStep' },
    { icon: <Truck size={24} />, labelKey: 'dispStep' },
    { icon: <PackageCheck size={24} />, labelKey: 'confStep' },
    { icon: <AlertTriangle size={24} />, labelKey: 'dispReport', warning: true }
  ];

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-center mb-20 text-luxury-dark"
        >
          {t('flowTitle')}
        </motion.h2>

        <div className="relative flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-luxury-dark/10 -z-10 -translate-y-1/2" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex flex-col items-center mb-8 md:mb-0 relative bg-beige-50 px-4"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm border ${step.warning ? 'bg-rose-50 text-rose-500 border-rose-200' : 'bg-white text-luxury-accent border-luxury-accent/20'}`}>
                {step.icon}
              </div>
              <span className={`text-sm font-medium uppercase tracking-wider ${step.warning ? 'text-rose-600' : 'text-luxury-dark'}`}>
                {t(step.labelKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderFlow;
