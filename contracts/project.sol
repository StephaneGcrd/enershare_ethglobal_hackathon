
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract ProjectToken {

    uint256 totalSupply = 100;
    uint256 circulatingSupply = 0;
    uint256 initialPricePerToken = 1;

    uint256 public treasurery; // 0 in the beginning, fills up with ICO

    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint _value);



}