import Web3 from 'web3';
import AdoptionCentre from '../abis/AdoptionCentre';
import {getImage} from "../Map/image"
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
        return 1;
    }

    // Get user name
    async getUserName() {
        if(this.uuid == "null"){
            console.log("nulllll");
            return "unknown";
        }
        let callsReceipt = await this.deployedAdoptionCentre.methods.getUserName(this.uuid).call({from: this.myAccount});
        let callsReturn = await this.deployedAdoptionCentre.methods.getAnimalNearBy(0, 0, 0, 0, 0, this.uuid).call({from: this.myAccount});
        console.log(callsReceipt);
        return callsReceipt;
    }

    // Get user all transaction records
    async getTransRecords() {
        let callsReceipt = await this.deployedAdoptionCentre.methods.getTransRecords(this.uuid).call({from: this.myAccount});
        console.log(callsReceipt); 
        return callsReceipt;
    }

    async getFakeRecords(){
        await this.sleep(2000);
        var fake_records = [
            {
                from: 'runze',
                to : 'juli',
                fromUser: 'runzw',
                toUser: 'julia',
                time: '2021/04/09',
                animalIndex : '1'
            },
            {
                from: 'runze',
                to : 'juli',
                fromUser: 'runzw',
                toUser: 'julia',
                time: '2021/04/09',
                animalIndex : '1'
            },
            {
                from: 'runze',
                to : 'juli',
                fromUser: 'runzw',
                toUser: 'julia',
                time: '2021/04/09',
                animalIndex : '1'
            }
        ]
        return fake_records;
    }

    // Get user all posted animal records
    async getPostedAnimalRecords() {
        if(this.uuid == "null"){
            return -1;
        }
        let callsReceipt = await this.deployedAdoptionCentre.methods.getPostedAnimal(this.uuid).call({from: this.myAccount});
        console.log(callsReceipt);
        return callsReceipt;
    }

    // Reset password
    async resetUserName(newUsername) {
        const gasAmount = await this.deployedAdoptionCentre.methods.resetUserName(newUsername, this.uuid).estimateGas({from: this.myAccount});
        console.log(gasAmount);
        let transReceipt = await this.deployedAdoptionCentre.methods.resetUserName(newUsername, this.uuid).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        return [transReturn.success, transReturn.eventMsg];         
    }

    // Reset password
    async resetPassword(old_password, new_password) {
        const gasAmount = await this.deployedAdoptionCentre.methods.resetPassword(old_password, new_password, this.uuid).estimateGas({from: this.myAccount});
        console.log(gasAmount);
        let transReceipt = await this.deployedAdoptionCentre.methods.resetPassword(old_password, new_password, this.uuid).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        return [transReturn.success, transReturn.eventMsg];         
    }

    // User registeration
    async registeration(username, password) {
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
        const gasAmount = await this.deployedAdoptionCentre.methods.logout(this.uuid).estimateGas({from: this.myAccount});
        let transReceipt = await this.deployedAdoptionCentre.methods.logout(this.uuid).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        console.log(transReturn);
        return [transReturn.success, transReturn.eventMsg];     
    }

    async getBalanceOf() {
        let balance = await this.WEB3.eth.getBalance(this.myAccount);
        return balance;
    }

    // Add missing animal, image data must be converted to base64
    async postAnimal(longitude, latitude, currentTime, price, imageBase64, title, description) {
        const gasAmount = await this.deployedAdoptionCentre.methods.postAnimalInfo(longitude, latitude, price, imageBase64, title, description, currentTime, this.uuid).estimateGas({from: this.myAccount});
        let transReceipt = await this.deployedAdoptionCentre.methods.postAnimalInfo(longitude, latitude, price, imageBase64, title, description, currentTime, this.uuid).send({from: this.myAccount, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        console.log(transReturn);
        return [transReturn.success, transReturn.eventMsg];  
    }

    // Acquire nearby missing animal based on your current position(WARNING: this function is incomplete for now, only will return full list)
    async getAnimalNearBy() {
        if(this.uuid == "null"){
            var image = getImage()
            console.log("11111111")
            return [
                {
                    index:0,
                    title: "marker0",
                    position: { lat: 49.246292, lng: -123.116226 },
                    imageBase64: image[0],
                    contactUserName: "julia"
                  },
                  {
                    index:1,
                    title: "marker1",
                    position: { lat: 49.166592, lng: -123.133568 },
                    imageBase64: image[1],
                    contractUserName: "shanny"
                  }
            ]
        }
        let callsReturn = await this.deployedAdoptionCentre.methods.getAnimalNearBy(0, 0, 0, 0, 0, this.uuid).call({from: this.myAccount});
        return callsReturn;
    }

    async adoptAnimal(index) {
        var currentTime = new Date();
        const gasAmount = await this.deployedAdoptionCentre.methods.adoptAnimal(index, currentTime,this.uuid).estimateGas({from: this.myAccount});
        let transReceipt = await this.deployedAdoptionCentre.methods.adoptAnimal(index, currentTime,this.uuid).send({from: this.myAccount, gas: gasAmount});
        console.log(transReceipt);
        return [transReceipt.success, transReceipt.eventMsg];
    }


}

export default Agent;

  