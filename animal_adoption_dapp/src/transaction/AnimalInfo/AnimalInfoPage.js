import React from 'react';
import {getAllAnimalInfo} from '../transaction_middleware';
import "./AnimalInfoPage.css";
import {Button, Form, Input, message, Row, Col} from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import OrderConfirmPage from '../OrderConfirm/OrderConfirmPage';


class AnimalInfoPage extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            animal_index : 0
        }
    }

    getMyAnimalInfo(){
        return getAllAnimalInfo(this.props.animal_id);
    }

    render(){
        var animal_info = this.getMyAnimalInfo();
        var marker_str = this.props.match.params[0];
        this.animal_index = marker_str.split("_")[2];
        console.log(animal_info[this.animal_index].position.lat);
        return(
            <Form
            name="addTokens"
            className="AddTokensForm"
            layout = "vertical"
            initialValues={{ remember: true }}
            onFinish = {()=>this.addMyTokens()}
            >
            <layout>
                <Header style={{
                    backgroundColor: '#fff',
                }}>
                <h2>Animal Information</h2>
                </Header>
                <Content>
                    <Form.Item>
                        <div>
                            <table>
                                <tr>
                                    <tr>
                                        <th>Animal ID:</th>
                                        <td>{animal_info[this.animal_index].animal_id}</td>
                                        {/* <td>{this.props.match.params[0]}</td> */}
                                    </tr>
                                    <tr>
                                    <th>Position:</th>
                                    <td>({animal_info[this.animal_index].position.lat},{animal_info[this.animal_index].position.lng})</td>
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
                        </div>
                    </Form.Item>
                    <Form.Item>
                            <Button type="primary" htmlType = 'submit' href={'/orderconfirm/'+ this.animal_index}>
                            I want to adopt him/her
                            </Button><br/>
                            <p></p>
                            <Button type="primary" htmlType = 'submit' href="/main">
                            Find more animals
                            </Button><br/>
                        </Form.Item>
                </Content>
            </layout>
            </Form>
        )
    }
}

export default AnimalInfoPage;