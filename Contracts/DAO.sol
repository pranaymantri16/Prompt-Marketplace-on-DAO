// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
    enum ProposalType { GENERAL, MEMBER_MANAGEMENT }

    struct Proposal {
        string description;
        uint256 id;
        uint256 voteCountYes;
        uint256 voteCountNo;
        bool executed;
        ProposalType proposalType;
        address targetMember;
        bool isAddingMember;
        mapping(address => bool) voted;
    }

    mapping(uint256 => Proposal) private proposals;
    mapping(address => bool) public members;
    uint256 public totalMembers;
    uint256 public proposalCount;
    address public admin;

    modifier onlyMember() {
        require(members[msg.sender], "Only DAO members can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
        members[msg.sender] = true;
        totalMembers = 1;
    }

    // **Create a General Proposal with a specific Proposal ID**
    function createProposal(uint256 _id, string calldata _description) external onlyMember {
        require(proposals[_id].id == 0, "Proposal ID already exists");

        Proposal storage newProposal = proposals[_id];
        newProposal.description = _description;
        newProposal.id = _id;
        newProposal.voteCountYes = 0;
        newProposal.voteCountNo = 0;
        newProposal.executed = false;
        newProposal.proposalType = ProposalType.GENERAL;

        proposalCount++; 
    }

    function createMemberProposal(uint256 _id, address _targetMember, bool _isAddingMember) external onlyMember {
        require(proposals[_id].id == 0, "Proposal ID already exists");

        Proposal storage newProposal = proposals[_id];
        newProposal.description = _isAddingMember ? "Proposal to Add Member" : "Proposal to Remove Member";
        newProposal.id = _id;
        newProposal.voteCountYes = 0;
        newProposal.voteCountNo = 0;
        newProposal.executed = false;
        newProposal.proposalType = ProposalType.MEMBER_MANAGEMENT;
        newProposal.targetMember = _targetMember;
        newProposal.isAddingMember = _isAddingMember;

        proposalCount++; 
    }

    function vote(uint256 proposalId, string calldata voteChoice) external onlyMember {
        require(proposals[proposalId].id != 0, "Proposal does not exist"); // **Fixed condition**
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.proposalType == ProposalType.GENERAL, "Use member voting for this proposal");
        require(!proposal.voted[msg.sender], "Already voted");

        proposal.voted[msg.sender] = true;

        if (keccak256(abi.encodePacked(voteChoice)) == keccak256(abi.encodePacked("Y"))) {
            proposal.voteCountYes++;
        } else if (keccak256(abi.encodePacked(voteChoice)) == keccak256(abi.encodePacked("N"))) {
            proposal.voteCountNo++;
        } else {
            revert("Invalid vote choice, must be 'Y' or 'N'");
        }
    }

    function voteMemberProposal(uint256 proposalId, string calldata voteChoice) external onlyMember {
    require(proposals[proposalId].id != 0, "Proposal does not exist");
    Proposal storage proposal = proposals[proposalId];
    require(!proposal.executed, "Proposal already executed");
    require(proposal.proposalType == ProposalType.MEMBER_MANAGEMENT, "Use general voting for this proposal");
    require(!proposal.voted[msg.sender], "Already voted");

    proposal.voted[msg.sender] = true;

    if (keccak256(abi.encodePacked(voteChoice)) == keccak256(abi.encodePacked("Y"))) {
        proposal.voteCountYes++;
    } else if (keccak256(abi.encodePacked(voteChoice)) == keccak256(abi.encodePacked("N"))) {
        proposal.voteCountNo++;
    } else {
        revert("Invalid vote choice, must be 'Y' or 'N'");
    }
}


    function executeProposal(uint256 proposalId) external onlyMember {
        require(proposals[proposalId].id != 0, "Proposal does not exist"); // **Fixed condition**
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Already executed");
        require(proposal.proposalType == ProposalType.GENERAL, "Use member execution for this proposal");
        require(proposal.voteCountYes > totalMembers / 2, "Majority 'Yes' votes required");

        proposal.executed = true;
    }

    function executeMemberProposal(uint256 proposalId) external onlyMember {
        require(proposals[proposalId].id != 0, "Proposal does not exist"); // **Fixed condition**
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Already executed");
        require(proposal.proposalType == ProposalType.MEMBER_MANAGEMENT, "Use general execution for this proposal");
        require(proposal.voteCountYes > totalMembers / 2, "Majority 'Yes' votes required");

        if (proposal.isAddingMember) {
            require(!members[proposal.targetMember], "Already a member");
            members[proposal.targetMember] = true;
            totalMembers++;
        } else {
            require(members[proposal.targetMember], "Not a member");
            members[proposal.targetMember] = false;
            totalMembers--;
        }

        proposal.executed = true;
    }
}
