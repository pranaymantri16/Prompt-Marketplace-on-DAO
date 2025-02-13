import { useState, useEffect, useRef } from 'react';
import './Career.css';

const CareerPage = () => {
  const [hasReadRules, setHasReadRules] = useState(false);
//   const [isAtBottom, setIsAtBottom] = useState(false);
  const rulesRef = useRef(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (rulesRef.current) {
        const element = rulesRef.current;
        const bottom = element.getBoundingClientRect().bottom;
        const isVisible = bottom <= window.innerHeight;
        
        if (isVisible && !hasScrolledToBottom) {
          setHasScrolledToBottom(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledToBottom]);

  const isButtonEnabled = hasReadRules && hasScrolledToBottom;

  const handleCheckboxChange = (e) => {
    setHasReadRules(e.target.checked);
  };

  const handleBecomeSeller = () => {
    if (!hasScrolledToBottom) {
      alert('Please read all rules before proceeding.');
      rulesRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // Add your logic for becoming a seller
    console.log('Becoming a seller...');
  };

  return (
    <div className="career-page">
      {/* Space for Navbar */}
      <div className="navbar-space"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="main-heading">
          Think yourself enough smart for prompts?
          <span className="sub-heading">Sell your designs to the marketplace</span>
        </h1>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-content">
          <p>
            Join our thriving marketplace of prompt engineers and designers. 
            We provide a platform where creativity meets opportunity. Our marketplace 
            enables talented individuals to monetize their prompt engineering skills 
            while helping businesses and individuals access high-quality, custom-designed prompts. 
            Whether you are an experienced prompt engineer or just starting out, 
            our platform offers the tools and support you need to succeed.
          </p>
        </div>
        <div className="info-image">
          <div className="placeholder-image">
            {/* Image placeholder - replace src with your actual image */}
            <img src="/api/placeholder/500/300" alt="Career opportunities" />
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="rules-section" ref={rulesRef}>
        <h2>Our Rules and Regulations</h2>
        <div className="rules-container">
          {/* Add more rules here */}
          <div className="rule-item">
            <span className="rule-number">1.</span>
            <p className='rule-text'>
            All prompts submitted must be original creations of the seller,
             free from plagiarism or content generated by AI tools or models.
            </p>
          </div>
          <div className="rule-item">
            <span className="rule-number">2.</span>
            <p className='rule-text'>
            Submitted prompts undergo a thorough review by the Verification Team; 
            approval status will be communicated to the seller post-review.
            </p>
          </div>
          <div className="rule-item">
            <span className="rule-number">3.</span>
            <p className='rule-text'>
            Sellers must provide a comprehensive and detailed description of the prompt,
             ensuring clarity for verification and selecting appropriate filters.
            </p>
          </div>
          <div className="rule-item">
            <span className="rule-number">4.</span>
            <p className='rule-text'>
            The seller must estimate the prompt’s cost based on the level of accuracy 
            and quality it delivers in AI-generated outputs.The final cost of the prompt 
            is determined by the Verification Team.
            </p>
          </div>
          <div className="rule-item">
            <span className="rule-number">5.</span>
            <p className='rule-text'>
            Sellers are prohibited from selling prompts directly to buyers once 
            integrated into the marketplace, with violations punishable under 
            intellectual property laws.
            </p>
          </div>
          <div className="rule-item">
            <span className="rule-number">6.</span>
            <p className='rule-text'>
            Sellers must create a crypto wallet for authentication, as incentives 
            will be disbursed in cryptocurrency;75% of the prompt's final price is 
            awarded to the seller on each sale
            </p>
          </div>
        </div>
      </section>

      {/* Agreement Section */}
      <section className="agreement-section">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="rules-agreement"
            checked={hasReadRules}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="rules-agreement">
            I have read and accept all the rules and terms by which the marketplace abides
          </label>
        </div>

        <button
          className={`become-seller-btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
          onClick={handleBecomeSeller}
          disabled={!isButtonEnabled}
        >
          Become a Prompt Seller
        </button>

        {!hasScrolledToBottom && (
          <p className="scroll-notice">Please read all rules before proceeding</p>
        )}
      </section>
    </div>
  );
};

export default CareerPage;