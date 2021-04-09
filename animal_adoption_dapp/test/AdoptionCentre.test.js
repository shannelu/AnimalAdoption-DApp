const adoptionCentre = artifacts.require("AdoptionCentre");
const { assert } = require('chai');
const truffleAssert = require('truffle-assertions');
require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('AdoptionCentre', (accounts) => {
    let adoptionCentreInstance;
    let deployerAddress = accounts[0];
    let user_1_uuid;
    let user_2_uuid;
    let user_1_address = accounts[0];
    let user_2_address = accounts[1];
    

    // Calculate the gas fee of one transaction
    async function getGasFee(res_tran) {
        const tx = await web3.eth.getTransaction(res_tran.receipt.transactionHash);
        const gas_price = BigInt(tx.gasPrice);
        const gas_used = BigInt(res_tran.receipt.gasUsed);
        let res = BigInt(gas_price * gas_used);
        return res;
    }

    before(async () =>{
        adoptionCentreInstance = await adoptionCentre.new({from: deployerAddress});
    });

    it('The deployment should be done successfully',async() =>{
        const address = adoptionCentreInstance.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    });

    it('Register user1', async () => {
        let transReceipt = await adoptionCentreInstance.register.sendTransaction("bevis", "0402", { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }            
        });        
    });

    it('Login user1', async () => {
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

    it('User1 post one missing animal information', async () => {
        let transReceipt = await adoptionCentreInstance.postAnimalInfo.sendTransaction(1, 1, 10, "imagebase64", "Missing cat tudou", "He is so cute!", user_1_uuid, { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }   
        });
    });

    it('User1 get nearby missing animal information', async () => {
        let callsReceipt = await adoptionCentreInstance.getAnimalNearBy.call(1, 1, 1, 1, 1, user_1_uuid, { from: user_1_address });
        if (!callsReceipt[2] || callsReceipt[1] != 1) {
            assert(false, "Return animal information with error!");
        } else {
            if (callsReceipt[0][0]['title'] != 'Missing cat tudou' || callsReceipt[0][0]['contactUserName'] != 'bevis') {
                assert(false, "Return animal information with error!");
            }
        }
    });

    it('Test user1 reset password', async () => {
        let transReceipt = await adoptionCentreInstance.resetPassword.sendTransaction("0403", "0330", user_1_uuid, { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                console.log("reset1")
                assert(false, ev.eventMsg);
            }
            return true
        });
        transReceipt = await adoptionCentreInstance.resetPassword.sendTransaction("0402", "0330", user_1_uuid, { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                console.log("reset2")
                assert(false, ev.eventMsg);
            }   
        });

    });

    it('Test user1 logout', async () => {
        let transReceipt = await adoptionCentreInstance.logout.sendTransaction(user_1_uuid, { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }   
        });

    });

    it('Login user1', async () => {
        var currentTime = new Date();
        let transReceipt = await adoptionCentreInstance.login.sendTransaction("bevis", "0330", currentTime.toLocaleString(), { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'LoginEvent', (ev) => {
            if (ev.success) {
                user_1_uuid = ev.uuid;
                return true;
            } else {
                assert(false, ev.eventMsg);
            }
        });   
    });

    it('Register User2', async () => {
        let transReceipt_1 = await adoptionCentreInstance.register.sendTransaction("vincent", "0330", { from: user_2_address });
        truffleAssert.eventEmitted(transReceipt_1, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }
        });
    });

    it('Login user2', async () => {
        var currentTime = new Date();
        let transReceipt = await adoptionCentreInstance.login.sendTransaction("vincent", "0330", currentTime.toLocaleString(), { from: user_2_address });
        truffleAssert.eventEmitted(transReceipt, 'LoginEvent', (ev) => {
            if (ev.success) {
                user_2_uuid = ev.uuid;
                return true;
            } else {
                assert(false, ev.eventMsg);
            }
        });
    });

    it('User2 adopt user1 missing animal', async () => {
        let transReceipt = await adoptionCentreInstance.adoptAnimal(0, user_2_uuid, { from: user_2_address, value: 10 });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }
        });
    });

    it('Test get transaction records', async () => {
        let callsReceipt = await adoptionCentreInstance.getTransRecords.call(user_1_uuid, { from: user_1_address });
        //console.log(callsReceipt);

    });

    it('Test user1 logout', async () => {
        let transReceipt = await adoptionCentreInstance.logout.sendTransaction(user_1_uuid, { from: user_1_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }   
        });

    });
    
    it('Test user2 logout', async () => {
        let transReceipt = await adoptionCentreInstance.logout.sendTransaction(user_2_uuid, { from: user_2_address });
        truffleAssert.eventEmitted(transReceipt, 'OperationEvents', (ev) => {
            if (ev.success) {
                return true;
            } else {
                assert(false, ev.eventMsg);
            }
        });

    });

});

