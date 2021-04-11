import React from 'react';
import './OrderConfirm.css';
import { Button, Form, message, Layout, Row, Col, Modal } from 'antd';
import Agent from '../../Agent/Agent';
const { Header, Footer, Sider, Content } = Layout;

var agent = new Agent(null, null);
var animal_index = 0;

class OrderConfirmPage extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            isPaymentCompleted: false,
            isPaymentSuccess: false,
            msg: ""
        }
    }

    async componentDidMount() {
        await agent.initialize();
        agent.uuid = localStorage.getItem(agent.myAccount);
        var a = await agent.getAnimalNearBy();
        var userName = await agent.getUserName();
        console.log(a);
        this.setState({
            myAgent: agent,
            animal_info: a,
            userName: userName,
            userAddress: agent.myAccount
        })
    }

    async pay(){
        let call = await this.state.myAgent.adoptAnimal(animal_index, this.state.animal_info[animal_index].price);
        if(call[0]){
            this.setState({
                isPaymentCompleted: true,
                isPaymentSuccess: true,
                msg: call[1]
            })
        }
        else{
            this.setState({
                isPaymentCompleted: true,
                msg: call[1]
            })
        }
    }

    cancelPaymentAfterFail(){
        this.setState({
            isPaymentCompleted : false 
        })
    }

    render() {
        animal_index = this.props.match.params[0];
        if(this.state.animal_info == null)  return <h1>nichousha</h1>
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
                                <td>{this.state.animal_info[animal_index].animalID}</td>
                            </tr>
                            <tr>
                                <th>Animal Name:</th>
                                <td>{this.state.animal_info[animal_index].title}</td>
                            </tr>
                            <tr>
                                    <th>Position:</th>
                                    <td>({this.state.animal_info[animal_index].latitude}, {this.state.animal_info[animal_index].longitude})</td>
                                    </tr>
                            <tr>
                                <th>Reporter:</th>
                                <td>{this.state.animal_info[animal_index].contactUserName}</td>
                            </tr>
                            <tr>
                                <th>Price(Ether):</th>
                                <td>{this.state.animal_info[animal_index].price}</td>
                            </tr>
                            <tr>
                                {/* <th>image</th> */}
                                {/* <th>Title</th> */}
                                <th>Description:</th>
                                <td>{this.state.animal_info[animal_index].description}</td>   
                            </tr>                    
                        </tr>
                    </table>
                </Col>
                <Col span={12}>
                        <h2>Confirm your personal information</h2>    
                        <Form.Item id = "username" label="Username">
                        <b>{this.state.userName}</b>
                        </Form.Item>
                        <Form.Item id = "address" label="Account Address">
                        <b>{this.state.userAddress}</b>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType='submit' className="login-form-button" onClick={()=>this.pay()} >
                                Confirm and Pay
                            </Button><br/>
                            <p></p>
                            <Button type="primary" htmlType = 'submit'  className="login-form-button" href={'/animalinfo/animal_marker_'+animal_index} >
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
                >
                </Form>
                <Modal
                    title = {this.state.isPaymentSuccess ? "Payment succeeds!" : "Payment fails!"}
                    visible = {this.state.isPaymentCompleted}
                    footer = { this.state.isPaymentSuccess ? 
                        <Button onClick = {()=>this.cancelPaymentAfterFail()}>
                            Cancel
                        </Button> 
                        :
                        <Button type = "primary" href = "/main">
                            Back to main menu
                        </Button>
                    }
                >
                    {this.state.msg}
                </Modal>
            </layout>
        )
    }
}

export default OrderConfirmPage;