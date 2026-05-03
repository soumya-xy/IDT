import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const Solution = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const signals = [
    { color: 'bg-emerald-500', titleKey: 'signalGreen', descKey: 'signalGreenDesc', border: 'border-emerald-200' },
    { color: 'bg-amber-500', titleKey: 'signalOrange', descKey: 'signalOrangeDesc', border: 'border-amber-200' },
    { color: 'bg-rose-500', titleKey: 'signalRed', descKey: 'signalRedDesc', border: 'border-rose-200' },
  ];

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-luxury-dark">{t('solutionTitle')}</h2>
          <p className="text-xl text-luxury-dark/70 font-light">{t('solutionSubtitle')}</p>
        </motion.div>

        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {signals.map((signal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`flex items-center gap-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border ${signal.border} shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${signal.color} shadow-inner z-10 relative`} />
                <div className={`absolute inset-0 rounded-full ${signal.color} animate-ping opacity-20`} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-luxury-dark mb-1">{t(signal.titleKey)}</h3>
                <p className="text-luxury-dark/70 font-light text-sm">{t(signal.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
