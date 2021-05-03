const CAS = artifacts.require("ContinuousAuctionStock");

contract('ContinuousAuctionStock', (accounts) => {
    it('display the issuer', async () => {
        const CASInstance = await CAS.deployed();
        const issuer = await CASInstance.issuer.call();
        console.log(issuer);
    });

    it('display the accounts', async () => {
        const CASInstance = await CAS.deployed();
        console.log(accounts);
    });
});