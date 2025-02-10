import { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import Modal from './components/Modal';

const images = [
  "Prompt3.jpg",
  "Prompt5.png",
  "prompt1.webp",
  "Prompt6.jpg",
  "Prompt4.png"
];

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container">
    <Navbar/>
      <main className="main-content">
        <h1 className="main-heading">Get your Prompts instantly</h1>
        <h1 className="main-heading">on Promato</h1>

        <button className="get-started-btn" onClick={()=>{setIsOpen(true)}}>Become a DAO</button>
        <button className="get-started-btn" onClick={()=>{navigate('/sell')}}>Sell Prompts</button>

        
        <div className="image-slider">
          <div 
            className="slider-content" 
            style={{ 
              transform: `translateX(-${currentImageIndex * 100}%)` 
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="slide">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </main>
        <Footer/>
        <Modal isOpen={isOpen} onClose={()=>{setIsOpen(false)}}/>
    </div>
    
  );
};

export default LandingPage;