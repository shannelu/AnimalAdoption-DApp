import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import UserInfoPage from './User/UserInfo/UserInfoPage';
import SignInPage from './User/UserAct/SignInPage';
import SignUpPage from './User/UserAct/SignUpPage';

class App extends React.Component{
  render(){
    return (
      <Router>
        <div id='root'>
          <Route path = '/Signup' component = {SignUpPage}/>
          <Route path = '/Signin' component = {SignInPage}/>
          <Route path = '/UserInfo' component = {UserInfoPage}/>
        </div>
      </Router>
    )
  }
}

export default App;
