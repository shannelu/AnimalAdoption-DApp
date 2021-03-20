import React, {Component} from 'react';
import './App.css';
import SignInPage from './SignInPage'

class App extends React.Component{
  render(){
    return (
      <div id='root'>
        <SignInPage></SignInPage>
      </div>
    )
  }
}

export default App;
