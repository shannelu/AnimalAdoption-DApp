import React from 'react';
import {getAllAnimalInfo} from '../transaction_middleware';


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
        animal_info.forEach(
            animal_info => {
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
            }
        )
        return(
            <div>
                <table>
                    {animal_info_html}
                </table>
                <p><button onclick="window.location.href='/OrderConfirm'">I want to adopt him/her</button></p>
                <p><button onclick="window.location.href='/AnimalInfo'">Find more animals</button></p>
            </div>
        )
    }
}

export default AnimalInfoPage;