import Web3 from 'web3';
import AdoptionCentre from '../abis/AdoptionCentre';
//const truffleAssert = require('truffle-assertions');

class Agent {
    constructor(myAccount,uuid){
        this.myAccount = myAccount;
        this.uuid = uuid;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getWeb3Provider(){
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying       MetaMask!');
        }
    }
    async initialize() {
        await this.getWeb3Provider();
        let accounts = await window.web3.eth.getAccounts();
        this.myAccount = accounts[0];
        this.networkId = await window.web3.eth.net.getId();
        this.networkData = AdoptionCentre.networks[this.networkId];
        //this.contractAddr = this.networkData.address;
        this.deployedAdoptionCentre = new window.web3.eth.Contract(AdoptionCentre.abi, this.networkData.address);
        //console.log("this.deployedAdoptionCentre");
        //console.log(this.deployedAdoptionCentre);
        this.isDeployed = function() {
            if (this.networkData) {
                return true;
            } else {
                window.alert('AdoptionCentre contract is not found in your blockchain.');
                return false;
            }
        };
    }

    async getAdoptedNum(){
        let callsReceipt = await this.deployedAdoptionCentre.methods.getAdoptedNum(this.uuid).call({from: this.myAccount});
        return callsReceipt;
    }

    // Get user name
    async getUserName() {
        if (this.uuid === "null" || this.myAccount === "null") {
            return "unknown";
        }
        let callsReceipt = await this.deployedAdoptionCentre.methods.getUserName(this.uuid).call({from: this.myAccount});
        // console.log(callsReceipt);
        return callsReceipt[1];
    }

    // Get user all transaction records
    async getTransRecords() {
        if (this.uuid === "null" || this.myAccount === "null") {
            return null;
        }
        let callsReceipt = await this.deployedAdoptionCentre.methods.getTransRecords(this.uuid).call({from: this.myAccount});
        console.log("getTransRecords");
        console.log(callsReceipt); 
        return callsReceipt[0];
    }

    // Get user all posted animal records
    async getPostedAnimalRecords() {
        if (this.uuid === "null" || this.myAccount === "null") {
            return -1;
        }
        let callsReceipt = await this.deployedAdoptionCentre.methods.getPostedAnimal(this.uuid).call({from: this.myAccount});
        console.log(callsReceipt);
        return {transRecords:callsReceipt[0], transNum: callsReceipt[3]};
    }

    // Reset password
    async resetUserName(newUsername) {
        if (this.uuid === "null" || this.myAccount === "null") {
            return [false, "Not login or metamask connection lost"];
        }
        const gasAmount = await this.deployedAdoptionCentre.methods.resetUserName(newUsername, this.uuid).estimateGas({from: this.myAccount});
        console.log(gasAmount);
        let transReceipt = await this.deployedAdoptionCentre.methods.resetUserName(newUsername, this.uuid).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        return [transReturn.success, transReturn.eventMsg];         
    }

    // Reset password
    async resetPassword(old_password, new_password) {
        if (this.uuid === "null" || this.myAccount === "null") {
            return [false, "Not login or metamask connection lost"];
        }
        const gasAmount = await this.deployedAdoptionCentre.methods.resetPassword(old_password, new_password, this.uuid).estimateGas({from: this.myAccount});
        console.log(gasAmount);
        let transReceipt = await this.deployedAdoptionCentre.methods.resetPassword(old_password, new_password, this.uuid).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        return [transReturn.success, transReturn.eventMsg];         
    }

    // User registeration
    async registeration(username, password) {
        if (this.myAccount === "null") {
            return [false, "Metamask connection lost"];
        }
        const gasAmount = await this.deployedAdoptionCentre.methods.register(username, password).estimateGas({from: this.myAccount});
        console.log("gasAmount");
        console.log(gasAmount);
        let transReceipt = await this.deployedAdoptionCentre.methods.register(username, password).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        console.log(transReturn);
        return [transReturn.success, transReturn.eventMsg];         
    }

    // User login, will return uuid
    async login(username, password) {
        if (this.myAccount === "null") {
            return [false, "Metamask connection lost"];
        }
        var currentTime = new Date();
        const gasAmount = await this.deployedAdoptionCentre.methods.login(username, password, currentTime.toLocaleString()).estimateGas({from: this.myAccount});
        let transReceipt = await this.deployedAdoptionCentre.methods.login(username, password, currentTime.toLocaleString()).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.LoginEvent.returnValues;
        //console.log(transReturn);
        this.uuid = transReturn.uuid;
        console.log('login uuid');
        console.log(this.uuid);
        return [transReturn.success, transReturn.eventMsg, transReturn.uuid];  
    }

    // User logout, nullify current uuid
    async logout() {
        console.log('logout uuid');
        console.log(this.uuid);
        if (this.uuid === "null" || this.myAccount === "null") {
            return [false, "Not login or metamask connection lost"];
        }
        const gasAmount = await this.deployedAdoptionCentre.methods.logout(this.uuid).estimateGas({from: this.myAccount});
        let transReceipt = await this.deployedAdoptionCentre.methods.logout(this.uuid).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        console.log(transReturn);
        return [transReturn.success, transReturn.eventMsg];     
    }

    async getBalanceOf() {
        if (this.uuid === "null" || this.myAccount === "null") {
            return [false, "Not login or metamask connection lost"];
        }
        let balance = await this.WEB3.eth.getBalance(this.myAccount);
        return balance;
    }

    // Add missing animal, image data must be converted to base64
    async postAnimal(longitude, latitude, currentTime, price, imageBase64, title, description) {
        if (this.uuid === "null" || this.myAccount === "null") {
            return [false, "Not login or metamask connection lost"];
        }
        // in gwei
        // var _price = parseInt(price);
        // in wei
        // _price = _price * 1000000000;
        const gasAmount = await this.deployedAdoptionCentre.methods.postAnimalInfo(longitude, latitude, price, imageBase64, title, description, currentTime, this.uuid).estimateGas({from: this.myAccount});
        let transReceipt = await this.deployedAdoptionCentre.methods.postAnimalInfo(longitude, latitude, price, imageBase64, title, description, currentTime, this.uuid).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        console.log(transReturn);
        return [transReturn.success, transReturn.eventMsg];  
    }

    // Acquire nearby missing animal based on your current position(WARNING: this function is incomplete for now, only will return full list)
    async getAnimalNearBy() {
        if (this.uuid === "null" || this.myAccount === "null") {
            return null;
        }
        let callsReturn = await this.deployedAdoptionCentre.methods.getAnimalNearBy(0, 0, 0, 0, 0, this.uuid).call({from: this.myAccount});
        console.log('getAnimalNearBy');
        console.log(callsReturn);
        return callsReturn[0];
    }

    async adoptAnimal(index, price) {
        if (this.uuid === "null" || this.myAccount === "null") {
            return [false, "Not login or metamask connection lost"];
        }
        console.log("Price");
        console.log(price);
        var payment = parseInt(window.web3.utils.toWei(price, "ether")).toString(10);
        console.log(payment);
        var currentTime = new Date();
        const gasAmount = await this.deployedAdoptionCentre.methods.adoptAnimal(index, currentTime,this.uuid).estimateGas({from: this.myAccount, value: payment});
        let transReceipt = await this.deployedAdoptionCentre.methods.adoptAnimal(index, currentTime,this.uuid).send({from: this.myAccount, gas: gasAmount, value: payment});
        console.log(transReceipt);
        return [transReceipt.success, transReceipt.eventMsg];
    }


}

export default Agent;

  