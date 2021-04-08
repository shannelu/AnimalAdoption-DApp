import React from 'react';
import {addTokens, getMyUsername, getMyTotalToken, getMyGasFee} from '../transaction_middleware';
import {Button, Form, Input, message} from 'antd';
import { Content } from 'antd/lib/layout/layout';

class AddTokensPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            token_amount : 0
        }
    }

    addMyTokens(){
        var owner = "DApp_Offical" // Initialize the owner account name. Plz change later!!!
        var input_amount = document.getElementById("tokens_amount").value;
        var success = addTokens(this.props.uuid, this.props.username, owner, input_amount);
        if(success){
            message.info("Add Tokens Successfully!" );
        }
        else{
            message.info("Add Tokens Fails! You don't have enough Ethers." );
        }
    }

    getUsername(){
        return getMyUsername(this.props.uuid);
    }

    getTotalToken(){
        return getMyTotalToken(this.props.uuid);
    }

    getGasFee(){
        return getMyGasFee(this.props.uuid);
    }
    render(){
        return(
            <Form
            name="addTokens"
            className="AddTokensForm"
            // layout = "vertical"
            initialValues={{ remember: true }}
            onFinish = {()=>this.addMyTokens()}
            >
                <layout>
                    <header>
                        <h1>Add Tokens</h1>
                    </header>
                    <Content>
                        <Form.Item id = "username" label="Username">
                        <b>{this.getUsername()}</b>
                        </Form.Item>
                        <Form.Item id = "balance" label="Current Balance">
                        <b>{this.getTotalToken()}</b>
                        </Form.Item>
                        <Form.Item id = "addtoken" label="Add Token Amount" rules={[{ required: true, message: 'Please input the amount of token you want to add!' }]} >
                            <Input id = "tokens_amount" 
                                placeholder="Input integer amount of token." 
                            />
                        </Form.Item>
                        <Form.Item id = "gasfee" label="Gas Fee (Tokens)">
                        <b>{this.getGasFee()}</b>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType = 'submit' className="login-form-button">
                            Confirm and Pay
                            </Button><br/>
                            <p></p>
                            {/* <Button type="primary" htmlType = 'submit' className="login-form-button" href="/UserInfo"> */}
                            <Button type="primary" htmlType = 'submit' className="login-form-button" href="">
                            Return to Last Page
                            </Button><br/>
                        </Form.Item>
                    </Content>
                </layout>
                {/* <h2>Confirm your personal information</h2>     */}
            </Form>   
        )
    }
}

export default AddTokensPage;