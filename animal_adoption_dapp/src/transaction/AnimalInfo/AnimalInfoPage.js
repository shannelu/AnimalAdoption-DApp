import React from 'react';
import {getAllAnimalInfo} from '../transaction_middleware';
import "./AnimalInfoPage.css";
import {Button, Form, Input, message, Row, Col} from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
// import ReactDOM from "react-dom";
// import "antd/dist/antd.css";



class AnimalInfoPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animal_num : 0
        }
    }

    getMyAnimalInfo(){
        return getAllAnimalInfo(this.props.animal_id);
    }

    render(){
        var animal_info = this.getMyAnimalInfo();
        var animal_info_html = [];
        animal_info.forEach(  // Incorrect for loop here. Need to add animal_id match condtion in middleware.
            animal_info => {
                // if(animal_info.animal_id == this.props.animal_id){ 
                    animal_info_html.push(
                        <tr>
                            <tr>
                                <th>Animal ID</th>
                                <td>{animal_info.animal_id}</td>
                            </tr>
                            <tr>
                                <th>X Coordinate</th>
                                <td>{animal_info.x}</td>
                            </tr>
                            <tr>
                                <th>Y Coordinate</th>
                                <td>{animal_info.y}</td>
                            </tr>
                            <tr>
                                <th>Reporter</th>
                                <td>{animal_info.contactUserName}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{animal_info.price}</td>
                            </tr>
                            <tr>
                                {/* <th>image</th> */}
                                {/* <th>Title</th> */}
                                <th>Description</th>
                                <td>{animal_info.description}</td>   
                            </tr>                    
                        </tr>
                    )
                // }
            }
        )
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
                                {animal_info_html}
                            </table>
                        </div>
                    </Form.Item>
                    <Form.Item>
                            <Button type="primary" htmlType = 'submit' href="/OrderConfirm">
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