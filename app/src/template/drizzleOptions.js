import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import ComplexStorage from "./contracts/ComplexStorage.json";
import TutorialToken from "./contracts/TutorialToken.json";

const options = {
    web3: {
        httpProvider: new Web3(new Web3.providers.HttpProvider('http://' + ip + ':7545')),
        block: false,
    },
    contracts: [SimpleStorage, ComplexStorage, TutorialToken],
    events: {
        SimpleStorage: ["StorageSet"],
    },
};

export default options;