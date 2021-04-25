// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <=0.8.4;

import "./ConvertLib.sol";

contract ContinuousAuctionStock {

    // the account address of the issuer
    address public issuer;

    // record the stock balance of each user
    mapping (address => uint) public stocks;

    constructor () {
        issuer = msg.sender;
    }

    function buy(address buyer, uint amount, uint price) public {
        // require(buyer!=issuer, "the buyer can not be the issuer");
    }

    function sell(address seller, uint amount, uint price) public {}

}