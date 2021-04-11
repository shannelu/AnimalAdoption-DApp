import React from 'react'
import SignInPage from './User/UserAct/SignInPage';
import SignUpPage from './User/UserAct/SignUpPage';
import UserInfoPage from './User/UserInfo/UserInfoPage';
import Nav from './Nav';
import { MapContainer } from './Map/MapContainer';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import AddTokensPage from './transaction/AddTokens/AddTokensPage';
class Main extends React.Component{
    render(){
        return(
            <Nav>
                <MapContainer/>
                <AddTokensPage name = "Shop"/>
                <UserInfoPage name = "User"/>  
            </Nav>
        )
    }
}

export default Main