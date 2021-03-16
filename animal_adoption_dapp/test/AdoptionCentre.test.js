const adoptionCentre = artifacts.require("AdoptionCentre");
const { assert } = require('chai');
const truffleAssert = require('truffle-assertions');
require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('AdoptionCentre', (accounts) => {
    let adoptionCentreInstance;
    let user_1_uuid;
    let user_1_address = accounts[0];

    // Calculate the gas fee of one transaction
    async function getGasFee(res_tran) {
        const tx = await web3.eth.getTransaction(res_tran.receipt.transactionHash);
        const gas_price = BigInt(tx.gasPrice);
        const gas_used = BigInt(res_tran.receipt.gasUsed);
        let res = BigInt(gas_price * gas_used);
        return res;
    }

    before(async () =>{
        adoptionCentreInstance = await adoptionCentre.new("Test Centre", "Group 8", '10000');
    });

    it('Test user registeration', async () => {
        let trans = await adoptionCentreInstance.register.sendTransaction("bevis", "0402", 100, user_1_address);
        let calls = await adoptionCentreInstance.confirmRegistration.call("bevis", user_1_address);
        assert(calls == "Successfully create user!", "User should be created successfully");
    });

    it('Test user login', async () => {
        var currentTime = new Date();
        let calls = await adoptionCentreInstance.login.call("bevis", "0402", user_1_address, currentTime.toLocaleString());
        if (calls[1] == "Login success!") {
            let trans = await adoptionCentreInstance.login.sendTransaction("bevis", "0402", user_1_address, currentTime.toLocaleString());
            console.log(calls[0]);
        } else {
            assert(false, "User should login successfully");
        }      
        
    });

});

