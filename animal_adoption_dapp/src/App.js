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
      logout : false
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

  async handleRegisteration(){
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

  async handleLogin(){
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
      </div>
    )
  }
}

export default App;
