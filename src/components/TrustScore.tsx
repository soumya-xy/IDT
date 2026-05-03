import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const TrustScore = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 px-6 bg-beige-100" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-luxury-dark">{t('trustTitle')}</h2>
          <p className="text-lg text-luxury-dark/70 font-light">{t('trustSubtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-3xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-luxury-dark/10 pb-8 mb-8">
            <div>
              <h3 className="text-2xl font-serif text-luxury-dark mb-1">Sharma Brothers Distributors</h3>
              <p className="text-luxury-dark/60 text-sm">FMCG & Beverages</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <span className="text-4xl font-serif text-luxury-gold">4.7</span>
              <span className="text-xs uppercase tracking-wider text-luxury-dark/50 font-semibold mt-1">Trust Score</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-luxury-dark font-medium">{t('accuracy')}</span>
              <div className="flex items-center gap-4 w-1/2">
                <div className="h-2 w-full bg-luxury-dark/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={inView ? { width: '96.2%' } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-emerald-400"
                  />
                </div>
                <span className="text-sm font-semibold w-12 text-right">96.2%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-luxury-dark font-medium">{t('onTime')}</span>
              <div className="flex items-center gap-4 w-1/2">
                <div className="h-2 w-full bg-luxury-dark/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={inView ? { width: '91%' } : {}}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className="h-full bg-emerald-400"
                  />
                </div>
                <span className="text-sm font-semibold w-12 text-right">91%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-luxury-dark font-medium">{t('disputeRate')}</span>
              <div className="flex items-center gap-4 w-1/2">
                <div className="h-2 w-full bg-luxury-dark/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={inView ? { width: '3.1%' } : {}}
                    transition={{ duration: 1.5, delay: 0.9 }}
                    className="h-full bg-rose-400"
                  />
                </div>
                <span className="text-sm font-semibold w-12 text-right">3.1%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustScore;
