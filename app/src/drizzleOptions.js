import Web3 from "web3";
import ContinuousAuctionStock from "./contracts/ContinuousAuctionStock.json"
// import WifiAllocation from "./contracts/WifiAllocation.json"

// const ip = '192.168.1.140'; // ip address of raspberry pi
const ip = '127.0.0.1'; // development

const options = {
    web3: {
        httpProvider: new Web3(new Web3.providers.HttpProvider('http://' + ip + ':8545')),
        block: false,
        // customProvider: new Web3('ws://' + ip + ':8546')
    },
    contracts: [ContinuousAuctionStock],
};

export default options;