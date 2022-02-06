
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma abicoder v2;
pragma experimental ABIEncoderV2;

contract ProjectToken {
    uint256 public totalSupply = 1e17;
    uint256 public circulatingSupply = 0;
    uint256 initialPricePerToken = 1;

    uint256 public treasurery; // 0 in the beginning, fills up with ICO
    address public owner;

    mapping(address => uint256) balances;


    struct Reward {
      uint256 amount;
    }

    struct ClaimedList {
        mapping(address => bool) rewardIsClaimed;
    }

    mapping(uint256 => ClaimedList) claimed;

    Reward [] private rewards;

    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender;
    }

    function getRewards() public view returns (Reward [] memory) {
        return rewards;
    }

    function addRewards() public payable {
        Reward memory newRew = Reward({amount: msg.value});
        rewards.push(newRew);
    }

    function getClaimAuth(uint256 _id) public view returns (bool auth) {
        ClaimedList storage list =  claimed[_id];
        return list.rewardIsClaimed[msg.sender];
    }

    function claimReward(uint256 _id) public payable returns (bool auth){
        ClaimedList storage list =  claimed[_id];
        require(list.rewardIsClaimed[msg.sender] == false, "Reward already claimed");
        require(balances[msg.sender] > 0, "No tokens owned");
        list.rewardIsClaimed[msg.sender] = true;

        uint256 value = (balances[msg.sender]* rewards[_id].amount) / totalSupply;
        rewards[_id].amount -= value;
        payable(msg.sender).transfer(value);
        return list.rewardIsClaimed[msg.sender];
    }






    function balanceOf(address _owner) public view returns (uint256 balance) {
        // Return the balance for the specific address
        return balances[_owner];
    }

    function buyICO(uint256 _amount) public payable {
        require(_amount < totalSupply-circulatingSupply, "No more token available at that price");
        require(_amount == msg.value, "No more token available at that price");
        balances[msg.sender] = balances[msg.sender] + _amount;
        circulatingSupply = circulatingSupply + _amount;
        payable(owner).transfer(msg.value);
    }

    function addTreasurery() public payable {
        treasurery += msg.value;
    }

    function claimTreasurery() public payable {
        require(balances[msg.sender] > 0, "No tokens owned");
        uint256 value = (balances[msg.sender]* treasurery) / totalSupply;
        treasurery -= value;
        payable(msg.sender).transfer(value);
    }
    //1000000000000000000

}
