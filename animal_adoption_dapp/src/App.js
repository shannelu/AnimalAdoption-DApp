import React, {Component} from 'react';
import './App.css';
import UserInfoPage from './User/UserInfo/UserInfoPage';

class App extends React.Component{
  render(){
    return (
      <div id='root'>
        <UserInfoPage/>
      </div>
    )
  }
}

export default App;
