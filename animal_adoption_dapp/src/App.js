import React, {Component} from 'react';
import './App.css';
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
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    this.accounts = await web3.eth.getAccounts();
    this.contractAddr = this.accounts[0];
    this.sellerAddr = this.accounts[1];
    this.buyerAddr = this.accounts[2];
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
<<<<<<< HEAD
      <div id='root'>
        <button type = "button" style = {this.state.like ? {color : "red"} : {color : "black"}}
          onClick = {()=>this.handleClick()}
        >
          {
            this.state.like ? 'liked!' : 'like'
          }
        </button>
        <h1>{getMyUsername(100)}</h1>
=======
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
<<<<<<< HEAD
>>>>>>> bevis
=======
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
>>>>>>> bevis
      </div>
    )
  }
}

export default App;
