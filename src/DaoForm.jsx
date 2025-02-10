import { useState } from 'react';
import './DaoForm.css';
import { ContractABI } from './providers/ABIContract';
import { contract_address } from './providers/ABIContract';
import { BrowserProvider, Contract } from 'ethers'
import  lighthouse  from '@lighthouse-web3/sdk'

const DaoApplicationForm = () => {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [qualificationEnabled, setQualificationEnabled] = useState(false);
  const [promptSalesEnabled, setPromptSalesEnabled] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [fileHash,setFileHash]=useState("");
  const [formData, setFormData] = useState({
    account:'',
    courseName: '',
    qualificationProof: null,
    promptCount: ''
  });

  const apiKey = 'fe386a57.500c16bd68584fedb93735086789a970';

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const acc=await window.ethereum.request({ method: 'eth_requestAccounts' });
        setFormData({
          ...formData,
          account:acc[0]
        })
        setIsMetaMaskConnected(true);
        
      } catch (error) {
        console.error('MetaMask connection failed:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  // // const payMembershipFee = async () => {
  // //   try {
  // //     const providers = new BrowserProvider(window.ethereum);
  // //     const signer = await providers.getSigner();
  // //     // Fetch membership fees from the contract (assuming it's defined as `membershipFees` in the contract)
  // //     const membershipFees = parseEther("0.1","ether");
  // //     console.log(`Membership Fees: ${membershipFees.toString()}`);

  // //     // Trigger payment transaction
  // //     const tx = await signer.sendTransaction({
  // //       to: contract_address,
  // //       value: membershipFees, // msg.value is dynamically set here
  // //     });

  //     console.log('Payment Transaction Hash:', tx.hash);

  //     const receipt = await tx.wait(); // Wait for confirmation
  //     console.log('Payment Receipt:', receipt);
  //     alert('Membership fee paid successfully!');
  //   } catch (error) {
  //     console.error('Payment failed:', error);
  //     throw new Error('Payment transaction failed');
  //   }
  // };

  const mintNFT=async(metadataHash)=>{
        try {
          const providers=new BrowserProvider(window.ethereum)

          const signer= await providers.getSigner();
          console.log(formData.account);
          const contract= new Contract(contract_address,ContractABI,signer)
          const tx= await contract.mintMembershipNFT(
            formData.account,
            `https://gateway.lighthouse.storage/ipfs/${metadataHash}`
          )
          console.log(tx);
          const reciept= await tx.wait();
          setTransactionHash(reciept)
          alert("Deposited successfully!");
          console.log(transactionHash);
        } catch (error) {
          console.log(error)
        }
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      qualificationProof: e.target.files[0]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isFormValid = () => {
    if (qualificationEnabled) {
      return formData.courseName && formData.qualificationProof;
    }
    if (promptSalesEnabled) {
      return formData.promptCount;
    }
    return false;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isFormValid()) {
      if(formData.qualificationProof){
       const response=await lighthouse.upload([formData.qualificationProof],apiKey);
       setFileHash(response.Hash);
      }
      
      const metadata_dao_user={
        accountAddress:formData.account,
        courseName:formData.courseName,
        qualification:fileHash,
        prompts:formData.promptCount
      }
      const metadataBlob = new Blob([JSON.stringify(metadata_dao_user)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], `metadata_dao_user_${formData.account}.json`); 
      const uploadResponse = await lighthouse.upload([metadataFile], apiKey);
      const metadataHash = uploadResponse.data.Hash; 
      // await payMembershipFee();
      await mintNFT(metadataHash);
      
      console.log('Form submitted:', formData);
      // Handle form submission
      
    }
  };

  return (
    <div className="dao-container">
      <h1 className="main-heading">Become a DAO</h1>
      <h2 className="sub-heading">Submit Your Application</h2>

      {!isMetaMaskConnected ? (
        <button className="metamask-button" onClick={connectMetaMask}>
          Connect MetaMask
        </button>
      ) : (
        <>
        <form onSubmit={handleSubmit} className="dao-form">
          <div className="toggle-section">
            <label className="toggle-label">
              Apply on qualification
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={qualificationEnabled}
                  onChange={(e) => setQualificationEnabled(e.target.checked)}
                />
                <span className="slider"></span>
              </div>
            </label>

            {qualificationEnabled && (
              <div className="qualification-inputs">
                <div className="input-group">
                  <label>Name of Course Done</label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    placeholder="Enter your course name"
                  />
                </div>
                <div className="input-group">
                  <label>Upload Proof of Qualification</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                <span>Rename the file as qualification(.extension) before upload</span>
                </div>
              </div>
            )}
          </div>

          <div className="toggle-section">
            <label className="toggle-label">
              Apply on the prompt sales
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={promptSalesEnabled}
                  onChange={(e) => setPromptSalesEnabled(e.target.checked)}
                />
                <span className="slider"></span>
              </div>
            </label>

            {promptSalesEnabled && (
              <div className="prompt-inputs">
                <div className="input-group">
                  <label>Number of Prompts Selected</label>
                  <input
                    type="number"
                    name="promptCount"
                    value={formData.promptCount}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="Enter number of prompts"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${isFormValid() ? 'active' : 'disabled'}`}
            disabled={!isFormValid()}
          >
            Submit Application
          </button>
        </form>
        </>
      )}
    </div>
  );
};

export default DaoApplicationForm;