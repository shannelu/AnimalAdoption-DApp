import React from 'react';
import {getMyUsername, getMyTotalToken, setMyUsername, setMyPassword} from '../user_middleware'


class UserProfilePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            settingUname : false,
            settingPwd : false,
            setPwdSuccess : 0
        }
    }

    getUsername(){
        return getMyUsername(this.props.uuid);
    }

    changeUsername(){
        this.setState({
            settingUname : true
        })
    }

    changePwd(){
        this.setState({
            setPwdSuccess : 0,
            settingPwd : true
        })
    }

    updateUsername(){
        var new_name = document.getElementById("new_username").value;
        setMyUsername(this.props.uuid, new_name);
        this.setState({
            settingUname : false
        })
    }

    updatePwd(){
        var old_pwd = document.getElementById("old_pwd").value;
        var new_pwd = document.getElementById("new_pwd").value;
        var info = setMyPassword(this.props.uuid, old_pwd, new_pwd);
        if(info.success){
            this.setState({
                settingPwd : false,
                setPwdSuccess : 1,
                pwd_msg : info.msg
            })
        }
        else{
            this.setState({
                setPwdSuccess : -1,
                pwd_msg : info.msg
            })
        }
    }

    getTotalToken(){
        return getMyTotalToken(this.props.uuid);
    }

    render(){
        return(
            <form>
                <h1>My Profile</h1>
                <h2>Username:</h2>
                {this.state.settingUname ? <input type="text" id = "new_username"/> : <b>{this.getUsername()}</b> }<br/>
                <button type = "button" onClick = {this.state.settingUname ? ()=>this.updateUsername() : ()=>this.changeUsername()}>{this.state.settingUname ? "update username" : "change username"}</button><br/>
                {this.state.settingPwd ? 
                    <div>
                        <h2>Old Password:</h2>
                        <input type="text" id = "old_pwd"/><br/>
                        <h2>New Password:</h2>
                        <input type="text" id = "new_pwd"/>
                    </div>
                : "" }
                <button type = "button" onClick = {this.state.settingPwd ? ()=>this.updatePwd() : ()=>this.changePwd()}>{this.state.settingPwd ? "update password" : "change password"}</button>
                {this.state.setPwdSuccess == 0  ? "" : <b>{this.state.pwd_msg}</b>}<br/>
                <h2>Tokens:</h2>
                <b>{this.getTotalToken()}</b>
            </form>
        )
    }
}

export default UserProfilePage