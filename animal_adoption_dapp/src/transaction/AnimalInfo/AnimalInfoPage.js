import React from 'react';
import {getAllAnimalInfo} from '../transaction_middleware';
import {Button, Form, Input, message} from 'antd';


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
            <div>
                <table>
                    {animal_info_html}
                    <p><Button href="/OrderConfirm">I want to adopt him/her</Button></p>
                    <p><Button href="">Find more animals</Button></p>
                </table>
            </div>
            </Form>
        )
    }
}

export default AnimalInfoPage;