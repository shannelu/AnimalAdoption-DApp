import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import UserInfoPage from './User/UserInfo/UserInfoPage';
import SignInPage from './User/UserAct/SignInPage';
import SignUpPage from './User/UserAct/SignUpPage';
import PostInfoPage from './User/UserAct/PostInfoPage'

class App extends React.Component{
  render(){
    return (
      <Router>
        <div id='root'>
          <Route path = '/signup' component = {SignUpPage}/>
          <Route path = '/signin' component = {SignInPage}/>
          <Route path = '/userInfo' component = {UserInfoPage}/>
          <Route path = '/post' component = {PostInfoPage}/>
        </div>
      </Router>
    )
  }
}

export default App;
