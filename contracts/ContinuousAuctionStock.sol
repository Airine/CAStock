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
    
    // the number of stocks issued
    uint public count;
    
    // fake buyable stocks
    uint public buyable;

    // record the stock balance of each user
    mapping (address => uint) public stocks;

    mapping (address => uint) public payed;

    // buy requests
    BuyRequest[] public buyReqs;

    // sell requests
    SellRequest[] public sellReqs;

    DoublySortedLinkedList public buyPrices;

    DoublySortedLinkedList public sellPrices;
    
    event log(string message);
    
    event logInt(uint value);
    
    event buyRequest(address buyer, uint price, uint amount, uint value);

    constructor () {
        issuer = msg.sender;
    }

    function buy(uint price) public payable {
        address buyer = msg.sender;
        uint amount = msg.value / 1 ether / price;
        uint unuse = msg.value / 1 ether - price * amount;
        emit buyRequest(buyer, price, amount, msg.value);
        
        if (address(this).balance < unuse * 1 ether) {
            emit log("not enough balance to return the unused");
            emit logInt(address(this).balance / 1 ether);
            // this branch should not be reached normally
            // if reached, revert all the transactions
            revert();
        } else if (unuse > 0) {
            emit log("send back the unused");
            payable(buyer).transfer(unuse * 1 ether);    
        }
        
        if (buyable > amount) {
            stocks[buyer] += amount;
            buyable -= amount;
        } else {
            emit log("no enough stock to buy");
        }
        // TODO: send the buy request
        
        // require(buyer!=issuer, "the buyer can not be the issuer");
    }

    function sell(uint amount, uint price) public {
        if (msg.sender == issuer) {
            count += amount;
        } else {
            address seller = msg.sender;
            if (stocks[seller] < amount) {
                emit log("no enough stock to sell");
            } else {
                payable(seller).transfer(price * amount * 1 ether);
                stocks[seller] -= amount;
            }
        }
        buyable += amount;
    }

}