import React from 'react';
import {getAllAnimalInfo} from '../transaction_middleware';
import "./transTable.css"


class AnimalInfoPage extends React.Component{
    constructor(){
        super();
        this.state = {
            animal_num = 0
        }
    }

    getMyAnimalInfo(){
        return getAllAnimalInfo(this.props.animal_id);
    }

    render(){
        var animal_info = this.getMyAnimalInfo();
        var animal_info_html = [];
        trans_records.forEach(
            animal_info => {
                animal_info_html.push(
                    <tr>
                        <td>{animal_info.animal_id}</td>
                        <td>{animal_info.x}</td>
                        <td>{animal_info.y}</td>
                        <td>{animal_info.contactUserName}</td>
                        <td>{animal_info.price}</td>
                        {/* <td>{animal_info.imageBase64}</td> */}
                        {/* <td>{animal_info.title}</td> */}
                        <td>{animal_info.description}</td>                        
                    </tr>
                )
            }
        )
        return(
            <div>
                <table id = "hor-minimalist-b">
                    <thead>
                        <tr>
                            <th>Animal ID</th>
                            <th>X Coordinates</th>
                            <th>Y Coordinates</th>
                            <th>Reporter</th>
                            <th>Price</th>
                            {/* <th>image</th> */}
                            {/* <th>Title</th> */}
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {animal_info_html}
                    </tbody>
                    
                </table>
            </div>
        )
    }
}

export default AnimalInfoPage;