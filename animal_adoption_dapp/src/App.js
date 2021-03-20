import React, {Component} from 'react';
import './App.css';
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'

class App extends React.Component{
  render(){
    return (
      <div id='root'>
        <SignInPage></SignInPage>
        <SignUpPage></SignUpPage>
      </div>
    )
  }
}

export default App;
