import React, { Component } from 'react';
import Web3 from 'web3';
import AdoptionCentre from '../abis/AdoptionCentre';
const truffleAssert = require('truffle-assertions');

class Agent {
    constructor() {
        this.uuid = null;
        this.freeTokens = 100;
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    async initialize(contractAddress) {
        this.contractAddr = contractAddress;
        this.networkId = await this.web3.eth.net.getId();
        this.networkData = AdoptionCentre.networks[this.networkId];
        this.deployedAdoptionCentre = new this.web3.eth.Contract(AdoptionCentre.abi, this.networkData.address);
        this.isDeployed = function() {
            if (this.networkData) {
                return true;
            } else {
                window.alert('AdoptionCentre contract is not found in your blockchain.');
                return false;
            }
        };
    }

    // User registeration
    async registeration(username, password, accountAddress) {
        await this.deployedAdoptionCentre.methods.approve(accountAddress, this.freeTokens).send({from: this.contractAddr});
        //await this.deployedAdoptionCentre.methods.allowance(this.contractAddr, accountAddress).send({from: this.contractAddr});
        const gasAmount = await this.deployedAdoptionCentre.methods.register(username, password, this.freeTokens).estimateGas({from: accountAddress});
        console.log(gasAmount);
        let transReceipt = await this.deployedAdoptionCentre.methods.register(username, password, this.freeTokens).send({from: accountAddress, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        console.log(transReturn);
        return [transReturn.success, transReturn.eventMsg];         
    }

    // User login, will return uuid
    async login(username, password, accountAddress) {
        var currentTime = new Date();
        const gasAmount = await this.deployedAdoptionCentre.methods.login(username, password, currentTime.toLocaleString()).estimateGas({from: accountAddress});
        let transReceipt = await this.deployedAdoptionCentre.methods.login(username, password, currentTime.toLocaleString()).send({from: accountAddress, gas: gasAmount});
        let transReturn = transReceipt.events.LoginEvent.returnValues;
        console.log(transReturn);
        this.uuid = transReturn.uuid;
        console.log('login uuid');
        console.log(this.uuid);
        return [transReturn.success, transReturn.eventMsg, transReturn.uuid];  
    }

    // User logout, nullify current uuid
    async logout(accountAddress) {
        console.log('logout uuid');
        console.log(this.uuid);
        const gasAmount = await this.deployedAdoptionCentre.methods.logout(this.uuid).estimateGas({from: accountAddress});
        let transReceipt = await this.deployedAdoptionCentre.methods.logout(this.uuid).send({from: accountAddress, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        console.log(transReturn);
        return [transReturn.success, transReturn.eventMsg];     
    }

    async getBalanceOf(accountAddress) {
        let balance = await this.web3.eth.getBalance(accountAddress);
        return balance;
    }

    // Add missing animal, image data must be converted to base64
    async postAnimal(longitude, latitude, price, imageBase64, title, description, accountAddress) {
        const gasAmount = await this.deployedAdoptionCentre.methods.postAnimalInfo(longitude, latitude, price, imageBase64, title, description, this.uuid).estimateGas({from: accountAddress});
        let transReceipt = await this.deployedAdoptionCentre.methods.postAnimalInfo(longitude, latitude, price, imageBase64, title, description, this.uuid).send({from: accountAddress, gas: gasAmount});
        let transReturn = transReceipt.events.OperationEvents.returnValues;
        console.log(transReturn);
        return [transReturn.success, transReturn.eventMsg];  
    }

    // Acquire nearby missing animal based on your current position(WARNING: this function is incomplete for now, only will return full list)
    async getAnimalNearBy(accountAddress) {
        let callsReturn = await this.deployedAdoptionCentre.methods.getAnimalNearBy(0, 0, 0, 0, 0, this.uuid).call({from: accountAddress});
        return callsReturn;
    }



}

export default Agent;

  