import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <footer className="py-32 px-6 bg-luxury-dark text-beige-50 relative overflow-hidden" ref={ref}>
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-serif font-light mb-12 tracking-wide"
        >
          {t('ctaText')}
        </motion.h2>

        <div className="text-sm font-light text-beige-50/50 tracking-widest uppercase">
          {t('navLogo')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
