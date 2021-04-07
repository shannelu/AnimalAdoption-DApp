import React from 'react'
import SignInPage from './User/UserAct/SignInPage';
import SignUpPage from './User/UserAct/SignUpPage';
import UserInfoPage from './User/UserInfo/UserInfoPage';
import Nav from './Nav';

class Main extends React.Component{
    render(){
        return(
            <Nav>
                <SignUpPage name = "Sign in"/>
                <SignInPage name = "Sign up"/>
                <UserInfoPage name = "profile"/>  
            </Nav>
        )
    }
}

export default Main