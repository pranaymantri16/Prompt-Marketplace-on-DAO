// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MembershipDAO is ERC721URIStorage, Ownable {
    uint256 public tokenIdCounter;
    address[] public daoMembers;

    struct NFTDetails {
        address sellerAddress;
        string metadataHash;
    }

    mapping(uint256 => NFTDetails) public nftDetails;

    event NFTMinted(uint256 tokenId, address indexed seller, string metadataHash);
    event SellerInfoSent(uint256 tokenId, address seller, address[] daoMembers);

    constructor(address initialOwner) ERC721("MembershipNFT", "MNFT") Ownable(initialOwner){
        transferOwnership(initialOwner);
    }

    function mintMembershipNFT(address _sellerAddress, string memory _metadataHash) public {
        require(_sellerAddress != address(0), "Seller address cannot be zero");
        require(bytes(_metadataHash).length > 0, "Metadata hash cannot be empty");
        require(daoMembers.length > 0, "No DAO members exist to send data");

        uint256 newTokenId = tokenIdCounter;

        _safeMint(owner(), newTokenId);
        nftDetails[newTokenId] = NFTDetails({
            sellerAddress: _sellerAddress,
            metadataHash: _metadataHash
        });

        tokenIdCounter++;

        emit NFTMinted(newTokenId, _sellerAddress, _metadataHash);
        emit SellerInfoSent(newTokenId, _sellerAddress, daoMembers);
    }

    function addDAOMember(address _member) public onlyOwner {
        require(_member != address(0), "Member cannot be zero");
        daoMembers.push(_member);
    }

    function removeDAOMember(address _member) public onlyOwner {
        require(_member != address(0), "Member cannot be zero");


        for (uint256 i = 0; i < daoMembers.length; i++) {
            if (daoMembers[i] == _member) {
                daoMembers[i] = daoMembers[daoMembers.length - 1];
                daoMembers.pop();
                break;
            }
        }
    }

    function getDAOMembers() public view returns (address[] memory) {
        require(daoMembers.length > 0, "No DAO members exist to send data");
        return daoMembers;
    }
}