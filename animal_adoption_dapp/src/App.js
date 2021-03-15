import React, {Component} from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      like : false
    }
  }

  handleClick(){
    this.setState(
      {
        like : !this.state.like
      }
    )
  }

  render(){
    return (
      <button type = "button" style = {this.state.like ? {color : "red"} : {color : "black"}}
        onClick = {()=>this.handleClick()}
      >
        {
          this.state.like ? 'liked!' : 'like'
        }
      </button>
    )
  }
}

export default App;
