import React, {Component} from 'react';
import Web3 from 'web3';
import Agent from './Agent/Agent.js';

class App extends React.Component{
  constructor(){
    super();
    
    this.state = {
      register : false,
      initialize : false,
      login : false,
      logout : false,
      post : false,
      get : false,
      adopt : false,
      resetPass : false,
      getTransRecords : false
    }
    
  }

  async initializeAgent() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else {
      alert("Please install MetaMask to use this dApp!");
    }
    this.accounts = await window.web3.eth.getAccounts();
    console.log("All accounts:")
    console.log(this.accounts);
    this.sellerAddr = this.accounts[0];
    this.buyerAddr = this.accounts[1];
    this.myAgent = new Agent();
    this.myAgent.initialize(this.contractAddr);
    this.setState(
      {
        initialize : !this.state.initialize
      }
    );
  }

  async handleAdoption() {
    let result = await this.myAgent.adoptAnimal(this.sellerAddr, this.buyerAddr);
    if (result[0]) {
      this.setState(
      {
        adopt : !this.state.adopt
      }
      );
    }
    console.log(result[1]);
  }

  async handleGetTransRecords() {
    let result = await this.myAgent.getTransRecords(this.sellerAddr);
    if (result[0]) {
      this.setState(
      {
        resetPass : !this.state.resetPass
      }
      );
    }
  }

  async handleResetPassword() {
    let result = await this.myAgent.resetPassword("0402", "0330", this.sellerAddr);
    if (result[0]) {
      this.setState(
      {
        resetPass : !this.state.resetPass
      }
      );
    }
    console.log(result[1]);
  }

  async handleRegisteration() {
    this.accounts = await window.web3.eth.getAccounts();
    console.log("Account:")
    console.log(this.accounts[0]);
    let balance = await window.web3.eth.getBalance(this.accounts[0]);
    console.log("Balance:");
    console.log(balance);
    let result = await this.myAgent.registeration('bevis123', '0402', this.sellerAddr);
    if (result[0]) {
      this.setState(
      {
        register : !this.state.register
      }
      );
    }
    console.log(result[1]);
  }

  async handleLogin() {
    let result = await this.myAgent.login('bevis123', '0402', this.sellerAddr);
    if (result[0]) {
      this.setState(
      {
        logout : false,
        login : !this.state.login
      }
      );
      console.log(result[2]);
    }
    console.log(result[1]);
  }

  async handleLogout(){
    let result = await this.myAgent.logout(this.sellerAddr);
    if (result[0]) {
      this.setState(
      {
        logout : !this.state.logout,
        login : false
      }
      );
    }
    console.log(result[1]);
  }

  async handlePost() {
    let result = await this.myAgent.postAnimal(0, 0, 10, 'imageBase64', 'Maomao', 'so cute', this.sellerAddr);
    if (result[0]) {
      this.setState(
      {
        post : !this.state.post
      }
      );
    }
    console.log(result[1]);
  }

  async handleGet() {
    let result = await this.myAgent.getAnimalNearBy(this.sellerAddr);
    console.log(result);
  }

  render(){
    return (
      <div>
      <button type = "button" style = {this.state.initialize ? {color : "red"} : {color : "black"}}
        onClick = {async ()=>this.initializeAgent()}
      >
        {
          this.state.initialize ? 'initialized!' : 'initialize'
        }
      </button>
      <button type = "button" style = {this.state.register ? {color : "red"} : {color : "black"}}
        onClick = {async ()=>this.handleRegisteration()}
      >
        {
          this.state.register ? 'registered!' : 'register'
        }
      </button>
      <button type = "button" style = {this.state.login ? {color : "red"} : {color : "black"}}
        onClick = {async ()=>this.handleLogin()}
      >
        {
          this.state.login ? 'login success!' : 'login'
        }
      </button>
      <button type = "button" style = {this.state.logout ? {color : "red"} : {color : "black"}}
        onClick = {async ()=>this.handleLogout()}
      >
        {
          this.state.logout ? 'logout success!' : 'logout'
        }
      </button>
      <button type = "button" style = {this.state.post ? {color : "red"} : {color : "black"}}
        onClick = {async ()=>this.handlePost()}
      >
        {
          this.state.get ? 'posted!' : 'post'
        }
      </button>
      <button type = "button" style = {this.state.get ? {color : "red"} : {color : "black"}}
        onClick = {async ()=>this.handleGet()}
      >
        {
          this.state.get ? 'got!' : 'get'
        }
      </button>
      <button type = "button" style = {this.state.adopt ? {color : "red"} : {color : "black"}}
        onClick = {async ()=>this.handleAdoption()}
      >
        {
          this.state.adopt ? 'adopted!' : 'adopt'
        }
      </button>
      <button type = "button" style = {this.state.resetPass ? {color : "red"} : {color : "black"}}
        onClick = {async ()=>this.handleResetPassword()}
      >
        {
          this.state.resetPass ? 'reseted!' : 'reset'
        }
      </button>
      <button type = "button" style = {this.state.getTransRecords ? {color : "red"} : {color : "black"}}
        onClick = {async ()=>this.handleGetTransRecords()}
      >
        {
          this.state.getTransRecords ? 'gotTransRecords!' : 'getTransRecords'
        }
      </button>
      </div>
    )
  }
}

export default App;
