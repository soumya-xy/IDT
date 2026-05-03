import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import TierSystem from '../components/TierSystem';
import OrderFlow from '../components/OrderFlow';
import TrustScore from '../components/TrustScore';
import ProsCons from '../components/ProsCons';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main>
        <Hero />
        <Problem />
        <Solution />
        <TierSystem />
        <OrderFlow />
        <TrustScore />
        <ProsCons />
      </main>
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
