const CAS = artifacts.require("ContinuousAuctionStock");

contract('ContinuousAuctionStock', (accounts) => {
    it('display the issuer', async() => {
        const CASInstance = await CAS.deployed();
        const issuer = await CASInstance.issuer.call();
        console.log(issuer);

        assert.equal(issuer, accounts[0], "the first account is not the issuer");
    });

    it('display the accounts', async() => {
        // const CASInstance = await CAS.deployed();
        console.log(accounts);
    });

    it('issuer issue 50 stocks', async() => {
        const CASInstance = await CAS.deployed();

        const issuer = await CASInstance.issuer.call();

        const amount = 50;
        const price = 10;

        await CASInstance.sell(amount, price, { from: issuer });

        const issued = await CASInstance.count.call();
        const sellReqs = await CASInstance.sellReqs.call(0);
        console.log(sellReqs);

        assert.equal(amount, issued, "the number of issued stocks is not matched");
    });

    it('cannot set the pricing factor after issue any stock', async() => {
        const CASInstance = await CAS.deployed();

        const success = await CASInstance.setPricingFactor(10e9, { from: accounts[0] });
        assert.equal(success, false, "should not set the pricing factor on the flight");
    });

    it('still have 50 stocks', async() => {
        const CASInstance = await CAS.deployed();

        const amount = 50;
        const issued = await CASInstance.count.call();
        assert.equal(amount, issued, "the number of issued stocks is not matched");
    });

});