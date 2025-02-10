import { useState } from 'react';
import './Modal.css';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate=useNavigate();

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  const handleProceed = () => {
    // You can add any additional logic here before closing
    onClose();
    navigate('/member');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>Disclaimer</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <hr className="divider" />

        <div className="modal-content">
          <div className="points-section">
            <ul>
              <li>Joining the DAO requires verification of qualifications or
                 the number of accepted prompts,as per defined criteria.</li>
              <li>Submission of deposit and NFT does not guarantee membership; 
                  acceptance is determined through DAO member voting.</li>
                <li>The membership deposit paid for joining the DAO is 
                  strictly non-refundable under any circumstances.</li>
            </ul>
          </div>

          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className="checkbox-text">
                I agree to the terms and conditions
              </span>
            </label>
          </div>

          {isChecked && (
            <button className="proceed-button" onClick={handleProceed}>
              Proceed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;