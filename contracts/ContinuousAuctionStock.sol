// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <=0.8.4;

import "./ConvertLib.sol";
import "./Queue.sol";
import "./DoublySortedLinkedList.sol";

struct BuyRequest {
    uint256 price;
    uint256 stock;
    string status;
}

struct SellRequest {
    uint256 price;
    uint256 stock;
    string status;
}

contract ContinuousAuctionStock {

    // the account address of the issuer
    address public issuer;

    // record the stock balance of each user
    mapping (address => uint) public stocks;

    mapping (address => uint) public unused;

    mapping (address => uint) public payed;

    // buy requests
    BuyRequest[] public buyReqs;

    // sell requests
    SellRequest[] public sellReqs;

    DoublySortedLinkedList public buyPrices;

    DoublySortedLinkedList public sellPrices;

    constructor () {
        issuer = msg.sender;
    }

    function buy(uint price) public payable {
        address memory buyer = msg.sender;
        uint amount = msg.value / price;
        uint unused = msg.value - price * amount;
        // console.log(buyer, " is requesting to buy ", amount, " stocks with price ", price);
        // console.log("Payed: ", msg.value, ", unused: ", unused);
        // require(buyer!=issuer, "the buyer can not be the issuer");
    }

    function sell(uint amount, uint price) public {

    }

    function retrieveUsed() 

}