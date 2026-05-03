import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const TierSystem = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const tiers = [
    { key: 'gold', desc: 'goldDesc', style: 'bg-gradient-to-br from-[#D4AF37]/20 to-[#AA7C11]/10 border-[#D4AF37]/40 text-[#8B6508]' },
    { key: 'silver', desc: 'silverDesc', style: 'bg-gradient-to-br from-[#C0C0C0]/20 to-[#A9A9A9]/10 border-[#C0C0C0]/50 text-[#696969]' },
    { key: 'bronze', desc: 'bronzeDesc', style: 'bg-gradient-to-br from-[#CD7F32]/20 to-[#8B4513]/10 border-[#CD7F32]/40 text-[#8B4513]' }
  ];

  return (
    <section className="py-24 px-6 bg-beige-100/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-center mb-16 text-luxury-dark"
        >
          {t('tierTitle')}
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`flex-1 rounded-3xl p-8 border backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-xl ${tier.style}`}
            >
              <h3 className="text-3xl font-serif font-bold mb-4">{t(tier.key)}</h3>
              <p className="font-light opacity-90 leading-relaxed">{t(tier.desc)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TierSystem;
