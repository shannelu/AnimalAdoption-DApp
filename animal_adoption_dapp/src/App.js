import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import AnimalInfoPage from './transaction/AnimalInfo/AnimalInfoPage';
// import UserInfoPage from './User/UserInfo/UserInfoPage';
// import SignInPage from './User/UserAct/SignInPage';
// import SignUpPage from './User/UserAct/SignUpPage';
import AddTokensPage from './transaction/AddTokens/AddTokensPage';
// import OrderConfirmPage from './transaction/OrderConfirm/OrderConfirmPage';

class App extends React.Component{
  render(){
    return (
      <Router>
        <div id='root'>
          <Route path = '/AnimalInfo' component = {AnimalInfoPage}/>
          {/* <Route path = '/Signup' component = {SignUpPage}/>
          <Route path = '/Signin' component = {SignInPage}/>
          <Route path = '/UserInfo' component = {UserInfoPage}/> */}
          <Route path = '/AddTokens' component = {AddTokensPage}/>
          {/* <Route path = '/OrderConfirm' component = {OrderConfirmPage}/> */}
        </div>
      </Router>
    )
  }
}

export default App;
