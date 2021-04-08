import React from 'react';
import {getMyUsername, getMyTotalToken, getMyGasFee, getAllAnimalInfo} from '../transaction_middleware';
import './OrderConfirm.css';
import {Button, Form, message, Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
// import ReactDOM from "react-dom";
// import "antd/dist/antd.css";


var total_token = 10000; 
/* If put function getAllConfirmOrder in the middleware, there is an error: 
Objects are not valid as a React child. If you meant to render a collection of children, use an array instead.

Update (April 1st: Some issues related with predefined Array. I will fix it later)
*/


class OrderConfirmPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            order_num : 0
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

    getAllConfirmOrder(){   // order_number?
        var success;
            var animal_info = getAllAnimalInfo(this.props.animal_id);
            if(animal_info.price <= total_token){
                success = true;
                total_token -= (animal_info.price +getMyGasFee(this.props.uuid)) ;  // 'to' account total ether will increase correspondingly (notice: gas fee deduction)
                animal_info.sold = true;
                // animal_info.order_num = "111"
            }
            else{
                success = false;
            }
        return {success: success};
    }

    getPrice(){
        var animal_info = getAllAnimalInfo(this.props.animal_id);
        return animal_info[0].price;   //Need to add animal_id match condtion in middleware.
    }

    render(){
        var animal_info = getAllAnimalInfo(this.props.animal_id);
        return(
            <layout>
                <Header style={{
                backgroundColor: '#fff',
            }}>
                <h1>Order Confirmation</h1>
                </Header>
                <Row>
                <Col span={12}>
                    <h2 >Animal Information</h2>
                    <table><tr>
                        <tr>
                            <th>Animal ID</th>
                            <td>{animal_info[0].animal_id}</td>
                        </tr>
                        <tr>
                            <th>X Coordinate</th>
                            <td>{animal_info[0].x}</td>
                        </tr>
                        <tr>
                            <th>Y Coordinate</th>
                            <td>{animal_info[0].y}</td>
                        </tr>
                        <tr>
                            <th>Reporter</th>
                            <td>{animal_info[0].contactUserName}</td>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td>{animal_info[0].price}</td>
                        </tr>
                        <tr>
                            {/* <th>image</th> */}
                            {/* <th>Title</th> */}
                            <th>Description</th>
                            <td>{animal_info[0].description}</td>   
                        </tr>

                    </tr></table>
                </Col>
                <Col span={12}>
                        <h2>Confirm your personal information</h2>    
                        <Form.Item id = "username" label="Username">
                        <b>{this.getUsername()}</b>
                        </Form.Item>
                        <Form.Item id = "price" label="Price">
                        <b>{this.getPrice()}</b>
                        </Form.Item>
                        <Form.Item id = "gasfee" label="Gas Fee (Tokens)">
                        <b>{this.getGasFee()}</b>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType = 'submit'  className="login-form-button" href="/main">
                            Confirm and Pay
                            </Button><br/>
                            <p></p>
                            <Button type="primary" htmlType = 'submit'  className="login-form-button" href="/AnimalInfo">
                            Return to Last Page
                            </Button><br/>
                        </Form.Item>
                </Col>
                </Row>
                <Form
                name="orderConfirm"
                className="OrderConfirmForm"
                layout = "vertical"
                initialValues={{ remember: true }}
                // onFinish = {()=>this.addMyTokens()}
                >
                </Form>

            </layout>
        )
    }
}

export default OrderConfirmPage;