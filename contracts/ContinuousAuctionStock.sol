// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <=0.8.4;

import "./ConvertLib.sol";
import "./Queue.sol";
import "./DoublySortedLinkedList.sol";

struct BuyRequest {
    uint256 price;
    uint256 stock;
    uint256 amount; // fixed value for record purpose
    uint8 status; // 1: pending, 2: abort, 3: finished
    address buyer;
}

struct SellRequest {
    uint256 price;
    uint256 stock;
    uint256 amount; // fixed value for record purpose
    uint8 status; // 1: pending, 2: abort, 3: finished
    address seller;
}

contract ContinuousAuctionStock {

    // the account address of the issuer
    address public issuer;
    
    // the number of stocks issued
    uint public count;

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
        
        uint requestID = buyReqs.length - 1;
        buyReqs.push(BuyRequest(price, amount, amount, 1, buyer));
        
        // 1. if can be satisified, process directly
        if (price > sellPrices.min()) {
            uint id = sellPrices.findle(price);
            while (id != 0) {
                Queue q = sellPrices.getQ(id);
                while (!q.empty()) {
                    uint sellReqID = q.top();
                    SellRequest storage request = sellReqs[sellReqID];
                    if (request.status == 1) {
                        address payable seller = payable(request.seller);
                        if (request.stock > amount) {
                            request.stock -= amount;
                            buyReqs[requestID].status = 3;
                            buyReqs[requestID].amount = 0;
                            stocks[buyer] += amount;
                            seller.transfer(price * amount * 1 ether);
                            return;
                        } else {
                            amount -= request.stock;
                            buyReqs[requestID].amount -= request.stock;
                            request.status = 3;
                            seller.transfer(price * request.stock * 1 ether);
                            request.stock = 0;
                            q.dequeue();
                        }
                    }
                }
                uint prevID = sellPrices.getPrev(id);
                sellPrices.updateQ(id, q);
                id = prevID;
            }
        }
        
        // 2. else add the left amount to the queue
        uint idx = buyPrices.find(price);
        if (idx == 0) {
            // not found
            Queue newPriceQ = new Queue();
            newPriceQ.enqueue(requestID);
            buyPrices.insert(DataValue(newPriceQ, price));
            emit log("new buy request price");
        } else {
            buyPrices.insertToQueue(idx, requestID);
            emit log("add buy request to existing queue");
        }
        
    }

    function sell(uint amount, uint price) public {
        if (msg.sender == issuer) {
            count += amount;
        }
        address seller = msg.sender;
        if (msg.sender != issuer && stocks[seller] < amount ) {
            emit log("no enough stock to sell");
            return;
        }
        
        if (seller != issuer) {
            stocks[seller] -= amount;
        }
        uint requestID = sellReqs.length - 1;
        sellReqs.push(SellRequest(price, amount, amount, 1, seller));
        
        // 1. if can be satisified, process directly
        if (price < buyPrices.max()) {
            uint id = buyPrices.findge(price);
            while (id != 0) {
                Queue q = buyPrices.getQ(id);
                while (!q.empty()) {
                    uint buyReqID = q.top();
                    BuyRequest storage request = buyReqs[buyReqID];
                    if (request.status == 1) {
                        // address payable seller = payable(request.seller);
                        if (request.stock > amount) {
                            request.stock -= amount;
                            sellReqs[requestID].status = 3;
                            sellReqs[requestID].amount = 0;
                            payable(seller).transfer(price * amount * 1 ether);
                            return;
                        } else {
                            amount -= request.stock;
                            sellReqs[requestID].amount -= request.stock;
                            request.status = 3;
                            payable(seller).transfer(price * request.stock * 1 ether);
                            request.stock = 0;
                            q.dequeue();
                        }
                    }
                }
                uint nextID = sellPrices.getPrev(id);
                buyPrices.updateQ(id, q);
                id = nextID;
            }
        }
                        
        // 2. else add the left amount to the queue
        uint idx = sellPrices.find(price);
        if (idx == 0) {
            // not found
            Queue newPriceQ = new Queue();
            newPriceQ.enqueue(requestID);
            sellPrices.insert(DataValue(newPriceQ, price));
            emit log("new sell request price");
        } else {
            sellPrices.insertToQueue(idx, requestID);
            emit log("add sell request to existing queue");
        }
    }

}