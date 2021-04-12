import React from 'react';
import "./AnimalInfoPage.css";
import {Button, Form, Carousel, Image} from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import Agent from '../../Agent/Agent';

var agent = new Agent(null,null)

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
        this.state = {
            animal_index: 0,
            myAgent: null
        }
    }

    async componentDidMount(){
        await agent.initialize();
        agent.uuid = localStorage.getItem(agent.myAccount);
        var a = await agent.getAnimalNearBy();
        this.setState({
            myAgent: agent,
            animal_info : a
        })
    }

    render(){
        var marker_str = this.props.match.params[0];
        var animal_index = marker_str.split("_")[2];
        console.log(marker_str);
        console.log(animal_index);
        if(this.state.animal_info == null)  return <h1>laoding...</h1>
        return(
            <Form
            name="addTokens"
            className="AddTokensForm"
            layout = "vertical"
            initialValues={{ remember: true }}
            >
            <layout>
                <Header style={{
                    backgroundColor: '#fff',
                }}>
                <h2>Animal Information</h2>
                </Header>
                <Content>
                <Form.Item>
                    <Carousel>
                        <div>
                        <h3 style={contentStyle}><Image
                        width={200}
                        src={this.state.animal_info[animal_index].imageBase64}
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
                    <Form.Item>
                        <div>
                            <table>
                                <tr>
                                    <tr>
                                        <th>Animal ID:</th>
                                        <td>{this.state.animal_info[animal_index].animalID}</td>
                                        {/* <td>{this.props.match.params[0]}</td> */}
                                    </tr>

                                    <tr>
                                        <th>Animal Title:</th>
                                        <td>{this.state.animal_info[animal_index].title}</td>
                                        {/* <td>{this.props.match.params[0]}</td> */}
                                    </tr>
                                    <tr>
                                    <th>Position:</th>
                                    <td>({this.state.animal_info[animal_index].latitude},{this.state.animal_info[animal_index].longitude})</td>
                                    </tr>
                                    <tr>
                                    <th>Physical Address:</th>
                                    <td>{this.state.animal_info[animal_index].physicalAddress}</td>
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
                        </div>
                    </Form.Item>
                    <Form.Item>
                            <Button type="primary" htmlType = 'submit' href={'/orderconfirm/'+ this.state.animal_info[animal_index].animalID}>
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