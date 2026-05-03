import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const toggleLanguage = () => i18n.changeLanguage(language === 'en' ? 'hi' : 'en');
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 glass border-b-0 py-4 px-6 md:px-12 flex justify-between items-center"
    >
      <Link to="/" className="text-2xl font-serif font-bold text-luxury-gold tracking-wider">
        {t('navLogo')}
      </Link>
      
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/retailer" className={`transition-colors hover:text-luxury-gold ${location.pathname === '/retailer' ? 'text-luxury-gold' : 'text-luxury-dark/70'}`}>
            Retailer App
          </Link>
          <Link to="/wholesaler" className={`transition-colors hover:text-luxury-gold ${location.pathname === '/wholesaler' ? 'text-luxury-gold' : 'text-luxury-dark/70'}`}>
            Wholesaler App
          </Link>
        </div>

        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-beige-200 hover:bg-beige-300 text-luxury-dark px-4 py-2 rounded-full transition-colors duration-300 shadow-sm"
        >
          <Languages size={18} />
          <span className="font-medium text-sm">
            {language === 'en' ? 'हिन्दी' : 'English'}
          </span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
