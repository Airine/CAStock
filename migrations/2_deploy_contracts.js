const ConvertLib = artifacts.require("ConvertLib");
const Queue = artifacts.require("Queue");
const DoublySortedLinkedList = artifacts.require("DoublySortedLinkedList");
const ContinuousAuctionStock = artifacts.require("ContinuousAuctionStock");
const MetaCoin = artifacts.require("MetaCoin");

module.exports = function(deployer) {
    deployer.deploy(ConvertLib);
    deployer.deploy(Queue);

    deployer.link(Queue, DoublySortedLinkedList);
    deployer.deploy(DoublySortedLinkedList);

    deployer.link(ConvertLib, ContinuousAuctionStock);
    deployer.link(Queue, ContinuousAuctionStock);
    deployer.link(DoublySortedLinkedList, ContinuousAuctionStock);


    deployer.deploy(ContinuousAuctionStock);


    deployer.link(ConvertLib, MetaCoin);
    deployer.deploy(MetaCoin);
};