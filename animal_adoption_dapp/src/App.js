import React from 'react';
import {BrowserRouter,Redirect,Route, Switch} from 'react-router-dom'
import './App.css';
import SignInPage from './User/UserAct/SignInPage';
import SignUpPage from './User/UserAct/SignUpPage';
import PostInfoPage from './User/UserAct/PostInfoPage'
import MapContainer from './Map/MapContainer';
import UserInfoPage from './User/UserInfo/UserInfoPage'
import AnimalInfoPage from './transaction/AnimalInfo/AnimalInfoPage';
import OrderConfirmPage from './transaction/OrderConfirm/OrderConfirmPage';
import Nav from './Nav';

class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path = "/">
              <Redirect to="/signin"/>
            </Route>
            <Route path="/main">
              <Nav>
                  <MapContainer name = "Animal Map"/>
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
            <Route path="/orderconfirm/*" component = {OrderConfirmPage}>
            </Route>
          </Switch>
      </BrowserRouter>
    )
  }
}

export default App



