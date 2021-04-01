import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import AnimalInfoPage from './transaction/AnimalInfo/AnimalInfoPage';
// import AddTokensPage from './transaction/AddTokens/AddTokensPage';
// import SignUpPage from './User/OrderConfirm/OrderConfirmPage';

class App extends React.Component{
  render(){
    return (
      <Router>
        <div id='root'>
          <Route path = '/AnimalInfo' component = {AnimalInfoPage}/>
          {/* <Route path = '/AddTokens' component = {AddTokensPage}/> */}
          {/* <Route path = '/OrderConfirm' component = {OrderConfirmPage}/> */}
        </div>
      </Router>
    )
  }
}

export default App;
