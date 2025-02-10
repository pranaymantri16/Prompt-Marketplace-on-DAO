import { Link } from 'react-router-dom'
import './Footer.css'
import { useState } from 'react';
import FeedbackModal from '../Pages/Feedback';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>    
    <FeedbackModal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}}/>
    <footer className="footer">
        <div className="footer-links">
          <Link to="/about">About</Link>
          <span className="separator">|</span>
          <Link to="/help">Help</Link>
          <span className="separator">|</span>
          <Link to="/feedback" onClick={(e)=>{e.preventDefault(); setIsModalOpen(true)}}>Feedback</Link>
        </div>
      </footer>
      </>

  )
}

export default Footer