import React from 'react';
import {PageHeader, Tag, Button, Statistic, Row, Input, Form, Modal, message, Empty} from 'antd';
import { Redirect } from 'react-router';
import "./transTable.css"

class UserProfilePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            settingUname : false,
            settingPwd : false,
            unique_name : 0,
            setPwdSuccess : 0,
            pwd_format : 0, //-1 for wrong format, 0 for not yet set pwd, 1 for corrent format
            pwd_confirmed : 0, //-1 for not confirmed, 0 for not yet set pwd, 1 for confirmed
            logOutModalVisible: false,
            loggedOut: false,
            Username: "unknown",
            PostedAnimalRecords: 0,
            AdoptedNum: 0,
            myAgent: this.props.agent
        }
    }

    async componentDidMount(){
        await this.state.myAgent.initialize();
        this.state.myAgent.uuid = localStorage.getItem(this.state.myAgent.myAccount);
        console.log(this.state.myAgent.myAccount);
        console.log("this uuid");
        console.log(this.state.myAgent.uuid);
        var call = await this.state.myAgent.getPostedAnimalRecords();
        this.setState({
            Username: await this.state.myAgent.getUserName(),
            PostedAnimalRecords : call.transNum,
            AdoptedNum: await this.state.myAgent.getAdoptedNum()
        })
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

    checkPwdFormat(){
        var input_password = document.getElementById("new_pwd").value;
        var re = /\w{6,20}/;
        if(input_password.length == 0){
            this.setState({
                pwd_format : 0
            })
        }
        else{
            this.setState({
                pwd_format : re.exec(input_password) == input_password ? 1 : -1
            })
        }
    }

    checkPwdConfirmed(){
        var input_password = document.getElementById("new_pwd").value;
        var input_confirmed = document.getElementById("confirm_pwd").value;
        this.setState({
            pwd_confirmed : input_password.length > 0 && input_confirmed.length > 0 ? (input_confirmed == input_password ? 1 : -1) : 0 
        })
    }

    async updateUsername(){
        var new_name = document.getElementById("new_username").value;
        let call = await this.state.myAgent.resetUserName(new_name);
        if(call[0]){
            message.success(call[1]);
            console.log("prepare for did mount!")
            this.setState({
                settingUname : false,
                unique_name : 0
            })
        }
        else{
            message.error(call[1]);
        }
    }

    async updatePwd(){
        var old_pwd = document.getElementById("old_pwd").value;
        var new_pwd = document.getElementById("new_pwd").value;
        var resetPwdInfo = await this.state.myAgent.resetPassword(old_pwd, new_pwd);
        if(resetPwdInfo[0]){
            this.setState({
                settingPwd : false,
                pwd_format : 0,
                pwd_confirmed : 0
            })
            message.success(resetPwdInfo[1])
        }
        else{
            message.error(resetPwdInfo[1])
        }
    }

    cancelChangePwd(){
        this.setState({
            settingPwd : false,
            setPwdSuccess : 0,
            pwd_format : 0,
            pwd_confirmed : 0
        })
    }

    cancelChangeUname(){
        this.setState({
            settingUname : false,
            unique_name : 0
        })
    }

    // async checkUniqueUsername(){
    //     var input_usernmame = document.getElementById("new_username").value;
    //     if(input_usernmame.length == 0 || ! (await this.state.myAgent.isUniqueName(input_usernmame))){
    //         this.setState({
    //             unique_name: 0
    //         })
    //     }
    //     else{
    //         this.setState({
    //             unique_name: await this.state.myAgent.isUniqueName(input_usernmame) ? 1 : -1
    //         })
    //     }
    // }

    readyLogOut(){
        this.setState({
            logOutModalVisible : true
        })
    }

    async logOut(){
        this.state.myAgent.initialize();
        this.state.myAgent.uuid = localStorage.getItem(this.state.myAgent.myAccount);
        var logOutInfo = await this.state.myAgent.logout();
        if(logOutInfo[0]){
            message.success(logOutInfo[1])
            this.setState({
                loggedOut : true
            })
        }else{
            message.error(logOutInfo[1])
            this.setState({
                logOutModalVisible : false
            })
        }
    }

    cancelLogOut(){
        this.setState({
            logOutModalVisible : false
        })
    }

    render(){
        console.log("rendering");
        this.state.myAgent.initialize();
        this.state.myAgent.uuid = localStorage.getItem(this.state.myAgent.myAccount);
        return(
            <div>
                {this.state.loggedOut ? <Redirect to='/signup'/> : ""}
                <PageHeader 
                    title = {this.state.Username}
                    tags={<Tag color="green">Online</Tag>}
                    extra={[
                        <Button key="3" onClick = {()=>this.changeUsername()} >Change Username</Button>,
                        <Button key="2" onClick = {()=>this.changePwd()}>Change Password</Button>,
                        <Button key="1" type="primary" onClick = {()=>this.readyLogOut()}>
                          Log Out
                        </Button>,
                      ]
                      }
                >
                    <Row>
                        <Statistic title="Posts" value={this.state.PostedAnimalRecords} />
                        <Statistic
                            title="Adopted"
                            value={this.state.AdoptedNum}
                            style={{
                                margin: '0 32px',
                            }}
                        />
                        <Statistic title = "Account Address" value = {this.state.myAgent.myAccount} style={{textAlign:"left"}}/>
                    </Row>
                    <Modal
                        title = "Reset username"
                        width = {600}
                        visible = {this.state.settingUname}
                        onOk = {()=>this.updateUsername()}
                        okText = "Reset"
                        onCancel = {()=>this.cancelChangeUname()}
                        destroyOnClose
                    >
                        <Form
                            style={{padding:0}}
                        >
                            <Form.Item
                                label="New Username" 
                                hasFeedBack
                                validateStatus = {this.state.unique_name == -1 ? "error" : "success"}
                                help = {this.state.unique_name == -1 ? "Your name has been taken! Chooese another one" : " "  }
                                style = {{textAlign:"left"}}
                            >
                                <Input placeholder = "new username" id = "new_username" style = {{width:400}} />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title = "Reset password"
                        visible = {this.state.settingPwd}
                        onOk = {()=>this.updatePwd()}
                        okText = "Reset"
                        okButtonProps = {{disabled : this.state.pwd_format != 1 || this.state.pwd_confirmed != 1}}
                        onCancel = {()=>this.cancelChangePwd()}
                        destroyOnClose
                    >
                        <Form
                            style = {{padding : 0}}
                        >
                            <Form.Item label = "old password" style = {{textAlign:"left"}}>
                                <Input type = "password" id = "old_pwd" placeholder = "enter your old password" style = {{width:390}}/>
                            </Form.Item>
                            <Form.Item 
                                label = "new password"
                                hasFeedback = {this.state.pwd_format != 0}
                                validateStatus = {this.state.pwd_format == -1 ? "error" : "success"}
                                help = {this.state.pwd_format == -1 ? "Password must only contains alphanumeric digits! And should be within 6-20 digits!" : " "}
                                style = {{textAlign:"left"}}
                            >
                                <Input type = "password" id = "new_pwd" placeholder = "enter a new password" onChange = {()=>this.checkPwdFormat()} style = {{width:385}}/>
                            </Form.Item>
                            <Form.Item 
                                label = "confrim new password"
                                hasFeedback = {this.state.pwd_confirmed != 0} 
                                validateStatus = {this.state.pwd_confirmed == -1 ? "error" : "success"}
                                help = {this.state.pwd_confirmed == -1 ? "Password does not match!" : " "  }
                                style = {{textAlign:"left"}}
                            >
                                <Input type = "password" id = "confirm_pwd" placeholder = "confirm your new password" onChange = {()=>this.checkPwdConfirmed()} style = {{width:335}}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title = "Log out"
                        visible = {this.state.logOutModalVisible}
                        onOk = {async ()=>this.logOut()}
                        okText = "Yes"
                        onCancel = {async ()=>this.cancelLogOut()}
                        destroyOnClose
                    >
                        Are you sure to log out?
                    </Modal>
                </PageHeader>
            </div>
        )
    }
}

export default UserProfilePage