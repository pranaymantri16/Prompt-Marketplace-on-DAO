import  { useEffect } from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-container">
      {/* Hero Section */}
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-content">
        <h1>Promato</h1>
          <h2>Where AI Meets Efficiency</h2>
          <p>Discover and share the best prompts for AI models</p>
        </div>
      </motion.div>

      {/* Instant Buy Section */}
      <section className="feature-section">
        <div className="feature-grid">
          <motion.div 
            className="feature-text"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Instant Access to Premium Prompts</h2>
            <p>
              Just like Zomato revolutionized food delivery, Promato brings you 
              instant access to high-quality AI prompts. No more struggling with 
              prompt engineering - find the perfect prompt in seconds.
            </p>
            <ul className="feature-list">
              <li>Curated collection of verified prompts</li>
              <li>Instant delivery to your workspace</li>
              <li>Tested with leading AI models</li>
              <li>Regular updates and improvements</li>
            </ul>
          </motion.div>
          <motion.div 
            className="feature-image"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img src="Prompt3.jpg" alt="Instant prompt delivery" />
          </motion.div>
        </div>
      </section>

      {/* Secure Selling Section */}
      <section className="feature-section dark">
        <div className="feature-grid reverse">
          <motion.div 
            className="feature-image"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img src="Prompt5.png" alt="Secure transactions" />
          </motion.div>
          <motion.div 
            className="feature-text"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Transparent & Secure Selling</h2>
            <p>
              Built on blockchain technology, Promato ensures complete transparency 
              and security for every transaction. Sell your prompts with confidence 
              and earn from your expertise.
            </p>
            <ul className="feature-list">
              <li>Blockchain-secured transactions</li>
              <li>Smart contract protection</li>
              <li>Instant payouts</li>
              <li>Verified seller profiles</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="cta-content">
          <h2>Ready to Transform Your AI Experience?</h2>
          <p>Join the community of prompt engineers and AI enthusiasts</p>
          <button className="cta-button">Get Started Today</button>
        </div>
      </motion.section>
    </div>
  );
};

export default About;