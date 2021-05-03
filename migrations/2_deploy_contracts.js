const ConvertLib = artifacts.require("ConvertLib");
const ContinuousAuctionStock = artifacts.require("ContinuousAuctionStock");
const MetaCoin = artifacts.require("MetaCoin");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, ContinuousAuctionStock);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(ContinuousAuctionStock);
  deployer.deploy(MetaCoin);
};
