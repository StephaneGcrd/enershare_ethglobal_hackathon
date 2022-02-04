
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ProjectToken {

    uint256 public totalSupply = 1e19;
    uint256 public circulatingSupply = 0;
    uint256 initialPricePerToken = 1;

    uint256 public treasurery; // 0 in the beginning, fills up with ICO
    address public owner;

    mapping(address => uint256) balances;


    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender;
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
