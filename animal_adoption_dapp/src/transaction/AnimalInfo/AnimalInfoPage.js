import React from 'react';
import {getAllAnimalInfo} from '../transaction_middleware';
import "./AnimalInfoPage.css";
<<<<<<< HEAD
import {Button, Form, Input, message, Row, Col} from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import OrderConfirmPage from '../OrderConfirm/OrderConfirmPage';
import Agent from '../../Agent/Agent';
=======
import {Button, Form, Carousel, Image, Input, message, Row, Col} from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import OrderConfirmPage from '../OrderConfirm/OrderConfirmPage';
import FormItem from 'antd/lib/form/FormItem';
>>>>>>> shanny

var agent = new Agent(null,null);

const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    // background: "#364d79"
  };

class AnimalInfoPage extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
<<<<<<< HEAD
            animal_index : 0,
            myAgent: null
=======
            animal_index : 0
>>>>>>> shanny
        }
    }

    getMyAnimalInfo(){
        return getAllAnimalInfo(this.props.animal_id);
    }

<<<<<<< HEAD
    async componentDidMount(){
        await agent.initialize()
        this.setState({
            myAgent: agent
        })
    }
=======

>>>>>>> shanny

    render(){
        var animal_info = this.getMyAnimalInfo();
        var marker_str = this.props.match.params[0];
        this.animal_index = marker_str.split("_")[2];
<<<<<<< HEAD
        console.log(animal_info[this.animal_index].position.lat);
=======
>>>>>>> shanny
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
<<<<<<< HEAD
=======
                <Form.Item>
                    <Carousel>
                        <div>
                        <h3 style={contentStyle}><Image
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        /></h3>
                        </div>
                        <div>
                        <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                        <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                        <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>,
                </Form.Item>
>>>>>>> shanny
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