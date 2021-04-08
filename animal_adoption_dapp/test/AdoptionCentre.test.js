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
        await adoptionCentreInstance.issueFreeTokens.sendTransaction(100, { from: user_1_address });
        let transReceipt = await adoptionCentreInstance.register.sendTransaction("bevis", "0402", 100, { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }            
        });
        truffleAssert.eventEmitted(transReceipt, 'Transfer', (ev) => {
            return ev.value == 100;
        }); 
    });

    it('Test user login', async () => {
        var currentTime = new Date();
        let transReceipt = await adoptionCentreInstance.login.sendTransaction("bevis", "0402", currentTime.toLocaleString(), { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'LoginEvent', (ev) => {
            if (ev.success) {
                user_1_uuid = ev.uuid;
                return true;
            } else {
                assert(false, ev.eventMsg);
            }
                
        });   
    });

    it('Test post missing animal information', async () => {
        let transReceipt = await adoptionCentreInstance.postAnimalInfo.sendTransaction(1, 1, 100, "image", "Missing cat tudou", "He is so cute!", user_1_uuid, { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }   
        });
    });

    it('Test post missing animal information', async () => {
        let callsReceipt = await adoptionCentreInstance.getAnimalNearBy.call(1, 1, 1, 1, 1, user_1_uuid, { from: user_1_address });
        if (!callsReceipt[2] || callsReceipt[1] != 1) {
            assert(false, "Return animal information with error!");
        }

    });

    it('Test user logout', async () => {
        let transReceipt = await adoptionCentreInstance.logout.sendTransaction(user_1_uuid, { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }   
        });

    });    

});

