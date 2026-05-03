import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { PackageX, TrendingDown, Store } from 'lucide-react';

const Problem = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const problems = [
    { icon: <PackageX size={32} />, titleKey: 'noInventory', descKey: 'noInventoryDesc' },
    { icon: <TrendingDown size={32} />, titleKey: 'overstock', descKey: 'overstockDesc' },
    { icon: <Store size={32} />, titleKey: 'stockouts', descKey: 'stockoutsDesc' }
  ];

  return (
    <section className="py-24 px-6 bg-beige-100" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-center mb-16 text-luxury-dark"
        >
          {t('problemTitle')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="glass p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-luxury-soft flex items-center justify-center text-luxury-accent mb-6 shadow-sm">
                {prob.icon}
              </div>
              <h3 className="text-xl font-medium mb-4 text-luxury-dark">{t(prob.titleKey)}</h3>
              <p className="text-luxury-dark/70 leading-relaxed font-light">{t(prob.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
