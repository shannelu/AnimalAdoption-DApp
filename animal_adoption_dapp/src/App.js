import React, {Component} from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import './App.css';
import SignInPage from './User/UserAct/SignInPage';
import SignUpPage from './User/UserAct/SignUpPage';
import PostInfoPage from './User/UserAct/PostInfoPage'
import Main from './Main';
import UserInfoPage from './User/UserInfo/UserInfoPage';

class App extends React.Component{
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/main">
              <Main />
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

export default App;
