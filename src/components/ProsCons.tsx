import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const ProsCons = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-center mb-16 text-luxury-dark"
        >
          {t('prosConsTitle')}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Pros */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 rounded-3xl bg-emerald-50/50 border border-emerald-100"
          >
            <h3 className="text-2xl font-serif text-emerald-800 mb-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              {t('pros')}
            </h3>
            <ul className="space-y-4">
              <li className="text-emerald-900/80 font-light leading-relaxed">Protects retailer working capital.</li>
              <li className="text-emerald-900/80 font-light leading-relaxed">Dynamic signals respect wholesaler privacy.</li>
              <li className="text-emerald-900/80 font-light leading-relaxed">Tier system incentivizes better behavior.</li>
              <li className="text-emerald-900/80 font-light leading-relaxed">Trust Scores built from real transaction data.</li>
            </ul>
          </motion.div>

          {/* Cons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 rounded-3xl bg-rose-50/50 border border-rose-100"
          >
            <h3 className="text-2xl font-serif text-rose-800 mb-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              {t('cons')}
            </h3>
            <ul className="space-y-4">
              <li className="text-rose-900/80 font-light leading-relaxed">Wholesaler adoption hurdle.</li>
              <li className="text-rose-900/80 font-light leading-relaxed">Strict 24-hr dispute window needs active monitoring.</li>
              <li className="text-rose-900/80 font-light leading-relaxed">Data privacy concerns for large distributors.</li>
              <li className="text-rose-900/80 font-light leading-relaxed">Digital literacy challenges for small stores.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProsCons;
