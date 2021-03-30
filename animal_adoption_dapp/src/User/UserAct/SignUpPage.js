import React from 'react';
import {signUp, isUniqueName, signIn} from '../user_middleware';
import {Button,Form,Input, Tooltip, Checkbox,Modal} from 'antd';
import {UserAddOutlined, CloseCircleOutlined, CheckCircleOutlined, createFromIconfontCN, LockOutlined} from '@ant-design/icons'
import './SignUp.css'

const PwdIcon = createFromIconfontCN({
    scriptUrl : '//at.alicdn.com/t/font_2453190_5yorc0vwlz5.js'
});

class SignUpPage extends React.Component{
    constructor(){
        super();
        this.state = {
            unique_name : 0, //-1 for duplicate name, 0 for not yet set name, 1 for unique name
            pwd_format : 0, //-1 for wrong format, 0 for not yet set pwd, 1 for corrent format
            pwd_confirmed : 0, //-1 for not confirmed, 0 for not yet set pwd, 1 for confirmed
            signedup : false,
            isModalVisible: false,
            fail_msg : "not sign up yet",
            free_token : 0,
            agreed : false
        }
    }

    checkUniqueUsername(){
        var input_usernmame = document.getElementById("username_signup").value;
        if(input_usernmame.length == 0){
            this.setState({
                unique_name: 0
            })
        }
        else{
            this.setState({
                unique_name: isUniqueName(input_usernmame) ? 1 : -1
            })
        }
    }

    checkPwdFormat(){
        var input_password = document.getElementById("password_signup").value;
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
        var input_password = document.getElementById("password_signup").value;
        var input_confirmed = document.getElementById("confirmed_signup").value;
        this.setState({
            pwd_confirmed : input_password.length > 0 && input_confirmed.length > 0 ? (input_confirmed == input_password ? 1 : -1) : 0 
        })
    }
    
    checkPwd(flag){
        if(flag == 0){
            this.checkPwdFormat();
        }   

        this.checkPwdConfirmed();

    }

    checkAgreement(){
        this.setState({
            agreed : !this.state.agreed
        })
    }

    handleSignUp(){
        if(this.state.unique_name == 1 && this.state.pwd_confirmed == 1 && this.state.agreed){
            var input_usernmame = document.getElementById("username_signup").value;
            var input_password = document.getElementById("password_signup").value;

            var info = signUp(input_usernmame,input_password);
            this.setState({
                signedup : info.success,
                isModalVisible : true,
                free_token : info.free_token
            })
            return;
        }
        this.setState({
            isModalVisible : true,
            fail_msg : "Sign up failed! Please try again!"
        })
    }

    render(){
        return(
            <Form className = "SignUpFrom" layout = "vertical" onFinish = {()=>this.handleSignUp()}>
                <h1>Create an account</h1>
                <Form.Item id = "myForm" label="Username" rules={[{ required: true, message: 'Please input your username!' }]} 
                    hasFeedback = {this.state.unique_name != 0} validateStatus = {this.state.unique_name == -1 ? "error" : "success"}
                    help = {this.state.unique_name == -1 ? "Your name has been taken! Chooese another one" : " "  }
                >
                    <Input id = "username_signup" 
                        placeholder="Everyone in our community has a unique name" 
                        prefix = {<UserAddOutlined/>} 
                        onChange = {()=>this.checkUniqueUsername()}
                    />
                </Form.Item>
                <Form.Item label="Password" rules={[{ required: true, message: 'Please input your password!' }]}
                    hasFeedback = {this.state.pwd_format != 0} validateStatus = {this.state.pwd_format == -1 ? "error" : "success"}
                    help = {this.state.pwd_format == -1 ? "Password must only contains alphanumeric digits! And should be within 6-20 digits!" : " "}
                >
                    <Input.Password id = "password_signup" type = "password" placeholder="Password" onChange = {()=>this.checkPwd(0)} allowClear = {true} prefix = {<LockOutlined/>}/>
                </Form.Item>
                <Form.Item label="Confirm Password" rules={[{ required: true, message: 'Please confirm your password!' }]}
                    hasFeedback = {this.state.pwd_confirmed != 0} validateStatus = {this.state.pwd_confirmed == -1 ? "error" : "success"}
                    help = {this.state.pwd_confirmed == -1 ? "Password does not match!" : " "  }
                >
                    <Input.Password id = "confirmed_signup" type = "password" placeholder="Double check" onChange = {()=>this.checkPwd(1)} allowClear = {true} prefix = {<LockOutlined/>}/>
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    onChange = {()=>this.checkAgreement()}
                    rules={[
                        {
                            validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                >
                    <Checkbox>
                    I have read the <a href="/agreement">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType = 'submit'>Sign Up</Button>
                </Form.Item>
                <Modal title={this.state.signedup ? "Sign up successfully!" : "Sign up failed!"}
                       visible = {this.state.isModalVisible}
                       okButtonProps = {{href:"/SignIn"}}
                       okText = "Sign in"
                       cancelText = "Sign up another account"
                       cancelButtonProps = {{href:"/Signup"}}
                       closable = 'true'
                >
                {this.state.signedup ? "Welcome to our community! You just earned 10 tokens as a gift from us for free!" : this.state.fail_msg}
                </Modal>
            </Form>
        )
    }
}

export default SignUpPage;