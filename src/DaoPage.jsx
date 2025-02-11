import { useEffect, useState } from 'react';
import './DaoPage.css';
// import { getContract } from './providers/ABIContract';
import { BrowserProvider,Contract } from "ethers"
import {contract_address,ContractABI} from './providers/ABIContract'

const DaoPage = () => {
  const[Nft,setNft]=useState([])
  const fetchMetaData=async(metadataURI)=>{
      try {
        const response=await fetch(metadataURI);
        if(!response.ok) throw new Error("Failed to fetch metadata");
        return await response.json();
      } catch (error) {
        console.log(error)
        return null;
      }
  }
  const getContract=async()=>{
    const providers=new BrowserProvider(window.ethereum)
	const signer= await providers.getSigner();
	const contract= new Contract(contract_address,ContractABI,signer)
  return contract;
  }
  useEffect(()=>{
    
    const contract=getContract();
    console.log(contract)
    const listenToEvents=async()=>{
      contract.on("NFTMinted",async(newTokenId, _sellerAddress, _metadataHash)=>{
        console.log(newTokenId,_sellerAddress)
        const metaData=await fetchMetaData(_metadataHash);
        if(metaData){
          setNft((prevNft)=>[
            ...prevNft,
            { tokenId: newTokenId.toString(), _sellerAddress, ...metaData }
          ])
        }
      })
    }
    listenToEvents()

    return()=>{
      contract.off("NFTMinted");
    };
  },[])

  const [selectedCard, setSelectedCard] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [visibleCards, setVisibleCards] = useState(9);

  // const mockProposals = [
  //   { id: 1, title: "Sentiment Analysis Prompt", status: "Active" },
  //   { id: 2, title: "Code Generation Model", status: "Completed" },
  //   { id: 3, title: "Data Classification System", status: "Active" }
  // ];

  const mockCards = Array(12).fill().map((_, i) => ({
    id: i + 1,
    title: `Proposal ${i + 1}`,
    description: "This is a sample proposal description...",
    author: "DAO Member",
    date: "2024-02-10"
  }));

  const userInfo = {
    proposalsVoted: 15,
    incentivesEarned: "500 TOKEN",
    joinedDate: "2024-01-01"
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="dao-page">
      <header className="dao-header">
        <h1 className="dao-title">Governance DAO</h1>
        <div className="header-right">
          <button className="refresh-btn">
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
          <button className="create-proposal-btn">Create Proposal</button>
          <div className="dropdown-container">
            <select className="proposal-dropdown">
              <option value="">Proposals</option>
              {Nft.map(p => (
                <option key={p.tokenId} value={p.tokenId}>{p._sellerAddress}</option>
              ))}
            </select>
          </div>
          <div className="user-icon" onClick={() => setShowUserInfo(!showUserInfo)}>
            <i className="fas fa-user"></i>
            {showUserInfo && (
              <div className="user-info-popup">
                <h3>DAO Information</h3>
                <p>Proposals Voted: {userInfo.proposalsVoted}</p>
                <p>Incentives Earned: {userInfo.incentivesEarned}</p>
                <p>Joined: {userInfo.joinedDate}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dao-content">
        <div className="proposals-section">
          {!selectedCard ? (
            <>
              <div className="cards-grid">
                {mockCards.slice(0, visibleCards).map(card => (
                  <div 
                    key={card.id} 
                    className="proposal-card"
                    onClick={() => handleCardClick(card)}
                  >
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <div className="card-footer">
                      <span>{card.author}</span>
                      <span>{card.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              {visibleCards < mockCards.length && (
                <button 
                  className="load-more-btn"
                  onClick={() => setVisibleCards(prev => prev + 9)}
                >
                  Load More
                </button>
              )}
            </>
          ) : (
            <div className="proposal-detail">
              <h2>{selectedCard.title}</h2>
              <div className="proposal-content">
                <div className="label-section">
                  <h3>Prompt Label</h3>
                  <p>Sample prompt label</p>
                </div>
                <div className="description-section">
                  <h3>Description</h3>
                  <p>{selectedCard.description}</p>
                </div>
                <div className="file-section">
                  <h3>File Content</h3>
                  <div className="file-viewer">
                    Sample text file content...
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="accept-btn">Accept</button>
                  <button className="reject-btn">Reject</button>
                  <button className="abstain-btn">Abstain</button>
                </div>
              </div>
              <button 
                className="back-btn"
                onClick={() => setSelectedCard(null)}
              >
                Back to Proposals
              </button>
            </div>
          )}
        </div>
        
        <div className="sandbox-section">
          <h2>OpenAI Sandbox</h2>
          <div className="sandbox-content">
            <textarea 
              placeholder="Test your prompts here..."
              className="sandbox-input"
            />
            <button className="test-btn">Test Prompt</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaoPage;