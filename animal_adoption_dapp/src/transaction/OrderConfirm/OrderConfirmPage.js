import React from 'react';
import './OrderConfirm.css';
import { Button, Form, message, Layout, Row, Col } from 'antd';
import Agent from '../../Agent/Agent';
const { Header, Footer, Sider, Content } = Layout;

var agent = new Agent(null, null);

class OrderConfirmPage extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            animal_index : 0
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


    // getUsername(){
    //     return getMyUsername(this.props.uuid);
    // }

    // getTotalToken(){
    //     return getMyTotalToken(this.props.uuid);
    // }

    // getGasFee(){
    //     return getMyGasFee(this.props.uuid);
    // }

    // async getAllConfirmOrder(){   // order_number?
    //     var success;
    //     //var animal_infos = await agent.getAnimalNearBy();
    //     //var animal_info = animal_infos[this.props.animal_id];
    //     var animal_info = getAllAnimalInfo(this.props.animal_id);
    //     if(animal_info.price <= total_token){
    //         success = true;
    //         total_token -= (animal_info.price +getMyGasFee(this.props.uuid)) ;  // 'to' account total ether will increase correspondingly (notice: gas fee deduction)
    //         animal_info.sold = true;
    //         // animal_info.order_num = "111"
    //     }
    //     else{
    //         success = false;
    //     }
    //     return {success: success};
    // }

    // getPrice(){
    //     var animal_info = getAllAnimalInfo(this.props.animal_id);
    //     return animal_info[0].price;   //Need to add animal_id match condtion in middleware.
    // }

    render() {
        var animal_index = this.props.match.params[0];
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
                            <Button type="primary" htmlType = 'submit'  className="login-form-button" onClick={async ()=> this.state.myAgent.adoptAnimal(animal_index)} >
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
                >
                </Form>

            </layout>
        )
    }
}

export default OrderConfirmPage;