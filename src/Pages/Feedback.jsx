import  { useState, useEffect } from 'react';
import './Feedback.css';

// eslint-disable-next-line react/prop-types
const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [experience, setExperience] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleStarHover = (hoveredValue) => {
    setHoveredRating(hoveredValue);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>Share Your Feedback</h2>
        
        {/* Star Rating */}
        <div className="rating-section">
          <p>How would you rate your experience?</p>
          <div className="stars-container" onMouseLeave={handleStarLeave}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star ${
                  star <= (hoveredRating || rating) ? 'active' : ''
                }`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Experience Input */}
        <div className="experience-section">
          <label htmlFor="experience">Share your experience</label>
          <textarea
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Tell us about your experience..."
            rows="4"
          />
        </div>

        {/* Share Link */}
        <div className="share-section">
          <button className="share-button" onClick={handleCopyLink}>
            {copySuccess ? 'Link Copied!' : 'Share with Friends'}
          </button>
          <p className="share-info">
            Help us grow by sharing with your friends!
          </p>
        </div>

        {/* Submit Button */}
        <button className="submit-button">
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;