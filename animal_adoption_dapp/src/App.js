import React, {Component} from 'react';
import {BrowserRouter,Route, Switch, Link} from 'react-router-dom'
import './App.css';
import SignInPage from './User/UserAct/SignInPage';
import SignUpPage from './User/UserAct/SignUpPage';
import PostInfoPage from './User/UserAct/PostInfoPage'
import MapContainer from './Map/MapContainer';
import UserInfoPage from './User/UserInfo/UserInfoPage'
import Nav from './Nav';
import AnimalInfoPage from './transaction/AnimalInfo/AnimalInfoPage';
import AddTokensPage from './transaction/AddTokens/AddTokensPage';
import OrderConfirmPage from './transaction/OrderConfirm/OrderConfirmPage';

class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/main">
              <Nav>
                  <MapContainer name = "Animal Map"/>
                  <AddTokensPage name = "Shop"/>
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
            <Route path="/animalinfo/*" component = {AnimalInfoPage}>
            </Route>
            <Route path="/orderconfirm">
              <OrderConfirmPage />
            </Route>
          </Switch>
      </BrowserRouter>
    )
  }
}

export default App



