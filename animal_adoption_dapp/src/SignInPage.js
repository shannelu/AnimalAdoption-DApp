import React, { Component } from 'react';
import {signIn} from './user_middleware';

class SignInPage extends Component{
    constructor(){
        super();
        this.state = {
            signedin : false,
            signedin_msg : "not signed in"
        }
    }

    handleClick(){
        var input_usernmame = document.getElementById("username").value;
        var input_password = document.getElementById("password").value;
        var info = signIn(input_usernmame,input_password);
        this.setState({
            signedin : info.success,
            signedin_msg : info.msg
        })
    }

    render(){
        return(
            <form>
                Username: <br/>
                <input type="text" id = "username"/><br/>
                Password: <br/>
                <input type="text" id = "password"/><br/>
                <button type = "button" onClick = {()=>this.handleClick()}>submit</button>
            </form>
        )
    }
}

export default SignInPage;