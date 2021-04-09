import React from 'react';
import {getMyUsername, getMyTotalToken, getMyGasFee, getAllAnimalInfo} from '../transaction_middleware';
import './OrderConfirm.css';
import {Button, Form, message, Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

var total_token = 10000; 

class OrderConfirmPage extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            animal_index : 0
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
        console.log(this.props.match.params[0]);
        this.animal_index = this.props.match.params[0];
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
                    <table>
                        <tr>
                            <tr>
                                <th>Animal ID:</th>
                                <td>{animal_info[this.animal_index].animal_id}</td>
                            </tr>
                            <tr>
                                    <th>Position:</th>
                                    <td>({animal_info[this.animal_index].position.lat}, {animal_info[this.animal_index].position.lng})</td>
                                    </tr>
                            <tr>
                                <th>Reporter:</th>
                                <td>{animal_info[this.animal_index].contactUserName}</td>
                            </tr>
                            <tr>
                                <th>Price:</th>
                                <td>{animal_info[this.animal_index].price}</td>
                            </tr>
                            <tr>
                                {/* <th>image</th> */}
                                {/* <th>Title</th> */}
                                <th>Description:</th>
                                <td>{animal_info[this.animal_index].description}</td>   
                            </tr>                    
                        </tr>
                    </table>
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
                            <Button type="primary" htmlType = 'submit'  className="login-form-button" href={'/animalinfo/animal_marker_'+this.animal_index} >
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