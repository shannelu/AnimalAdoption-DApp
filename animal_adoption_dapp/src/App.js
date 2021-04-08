import React, {Component} from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import './App.css';
import SignInPage from './User/UserAct/SignInPage';
import SignUpPage from './User/UserAct/SignUpPage';
import PostInfoPage from './User/UserAct/PostInfoPage'
import Main from './Main';
import MapContainer from './Map/MapContainer';
import UserInfoPage from './User/UserInfo/UserInfoPage'
import Nav from './Nav';
import AnimalInfoPage from './transaction/AnimalInfo/AnimalInfoPage';
import AddTokensPage from './transaction/AddTokens/AddTokensPage';
import OrderConfirmPage from './transaction/OrderConfirm/OrderConfirmPage';

class App extends React.Component{
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/main">
              <Nav>
                  <MapContainer name = "Animal Map"/>
                  <SignInPage name = "Shop"/>
                  <UserInfoPage name = "User"/>  
              </Nav>
            </Route>
            <Route path="/map">
              <MapContainer/>
            </Route>
            <Route path="/signin">
              <SignInPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/post">
              <PostInfoPage />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App



