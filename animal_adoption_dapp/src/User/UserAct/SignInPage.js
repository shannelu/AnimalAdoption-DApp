import React from 'react';
import {signIn} from '../user_middleware';
import {Form, Input, Checkbox, Button, message, Space} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './SignIn.css'
import { Redirect } from 'react-router';

class SignInPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            signedin : false,
            signedin_msg : "not signed in"
        }
    }

    logIn(){
        var input_usernmame = document.getElementById("username").value;
        var input_password = document.getElementById("password").value;
        var success = signIn(input_usernmame,input_password);
        if(success){
            this.setState({
                signedin : success
            })
        }
        else{
            message.info('Your password does not match!');
        }
    }

    render(){
        console.log(this.state.signedin);
        return(
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish = {()=>this.logIn()}
            >
                {this.state.signedin ? <Redirect to="/main"/> : ""}
                <h1>Log in</h1>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input id = "username" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                    id = 'password'
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="">
                    Forgot password?
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType = 'submit'  className="login-form-button">
                    Log in
                    </Button><br/>
                    <p></p>
                    Or <a href="/signup">Sign up now!</a>
                </Form.Item>
            </Form>
        )
    }
}

export default SignInPage;