import React from 'react';
import {signUp} from '../../user_middleware';

class SignInPage extends React.Component{
    constructor(){
        super();
        this.state = {
            signedup : false,
            signedup_msg : "not sign up yet",
            free_token : 0
        }
    }

    handleClick(){
        var input_usernmame = document.getElementById("username_signup").value;
        var input_password = document.getElementById("password_signup").value;
        var info = signUp(input_usernmame,input_password);
        this.setState({
            signedup : info.success,
            signedup_msg : info.msg,
            free_token : info.free_token
        })
    }

    render(){
        return(
            <form>
                Username: <br/>
                <input type="text" id = "username_signup"/><br/>
                Password: <br/>
                <input type="text" id = "password_signup"/><br/>
                <button type = "button" onClick = {()=>this.handleClick()}>Sign Up</button>
                <p>
                    {
                        this.state.signedup ? "Welcome to our community! You just earned " + this.state.free_token + " token" + (this.state.free_token > 1 ? "s" : "") + " as a gift from us!" : ""
                    }
                </p>
            </form>
        )
    }
}

export default SignInPage;