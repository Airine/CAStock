const ConvertLib = artifacts.require("ConvertLib");
const ContinuousAuctionStock = artifacts.require("ContinuousAuctionStock");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, ContinuousAuctionStock);
  deployer.deploy(ContinuousAuctionStock);
};
