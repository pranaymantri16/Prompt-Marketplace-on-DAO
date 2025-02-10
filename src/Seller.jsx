import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import './Seller.css'
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import lighthouse from '@lighthouse-web3/sdk'


const Seller = () => {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [acc,setAcc]=useState('')
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    description: '',
    promptFor: '',
    useCase: null
  });

 
  const topics = [
    'Content Writing',
    'Code Generation',
    'Data Analysis',
    'Creative Writing',
    'Marketing',
    'SEO',
    'Academic Writing',
    'Business',
    'Other'
  ];
    const apiKey = 'fe386a57.500c16bd68584fedb93735086789a970';
    

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        if (accounts.length > 0) {
          setIsMetaMaskConnected(true);
          setAcc(accounts)
        }
      } catch (error) {
        console.error('MetaMask connection error:', error);
      }
    } else {
      alert('Please install MetaMask to continue');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'text/plain'||file.type === 'pdf')) {
      setFormData({ ...formData, useCase: file });
    } else {
      alert('Please upload only text files');
      e.target.value = '';
    }
  };
  const uploadMetadataToLighthouse = async(metadata)=> {
    try {
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], `metadata_${acc}_${formData.title}.json`); 
      const uploadResponse = await lighthouse.upload([metadataFile], apiKey);
      const metadataHash = uploadResponse.data.Hash; 
      console.log('Metadata uploaded successfully, Hash:', metadataHash);
      return metadataHash;
    } catch (error) {
      console.error('Error uploading metadata:', error);
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMetaMaskConnected) {
      alert('Please connect MetaMask first');
      return;
    }
    const file=formData.useCase
    console.log(file)
    const uploadResponse = await lighthouse.upload([file], apiKey);
    console.log(uploadResponse);

    const metaData = {
        title: formData.title,
        topic: formData.topic,
        description: formData.description,
        promptFor: formData.promptFor,
        fileHash: uploadResponse.data.Hash,
        userAddress:acc
      };
    const resultLink=uploadMetadataToLighthouse(metaData);
    console.log(resultLink);
    console.log(metaData);
      
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <>
    <Navbar/>
    <div className="seller-page">
      <div className="content-wrapper">
    <h1 className='wrapper-text'>Sell your prompt by crypto wallet</h1>
        <div className="metamask-section">
            <div className="metamask-wrap">
            <h2>Connect to your account</h2>
          <button 
            onClick={connectMetaMask}
            className={`metamask-button ${isMetaMaskConnected ? 'connected' : ''}`}
          >
            {isMetaMaskConnected ? 'MetaMask Connected' : 'Connect MetaMask'}
          </button>
          </div>
          {!isMetaMaskConnected && (
            <div className="warning-message">
              <AlertCircle className="w-5 h-5" />
              <span>Connect MetaMask to enable form submission</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="seller-form">
          <div className="form-group">
            <label htmlFor="title">Prompt Title</label>
            <input
              type="text"
              id="title"
              disabled={!isMetaMaskConnected}
              value={formData.title}
              placeholder='Enter the title'
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="topic">Topic</label>
            <select
              id="topic"
              disabled={!isMetaMaskConnected}
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
            >
              <option value="">Select a topic</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              disabled={!isMetaMaskConnected}
              value={formData.description}
              placeholder='Describe your prompt in detail'
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="promptFor">Prompt For</label>
            <input
              type="text"
              id="promptFor"
              disabled={!isMetaMaskConnected}
              placeholder="e.g., GPT-4, Claude, etc."
              value={formData.promptFor}
              onChange={(e) => setFormData({ ...formData, promptFor: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="useCase">Prompts & Use Case Upload</label>
            <input
              type="file"
              id="useCase"
              accept=".txt,pdf"
              disabled={!isMetaMaskConnected}
              onChange={handleFileChange}
              required
            />
            <small>Only .txt, pdf files are accepted</small>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={!isMetaMaskConnected}
          >
            Submit Prompt
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Seller;