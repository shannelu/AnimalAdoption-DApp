import React from 'react';
import {getAllMyTransRecords} from '../user_middleware'
import "./transTable.css"

class UserTransPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trans_num : 0
        }
    }

    getMyTransRecords(){
        return getAllMyTransRecords(this.props.uuid);
    }

    render(){
        var trans_records = this.getMyTransRecords();
        var trans_records_html = [];
        trans_records.forEach(
            trans_record => {
                trans_records_html.push(
                    <tr>
                        <td>{trans_record.from}</td>
                        <td>{trans_record.to}</td>
                        <td>{trans_record.hash}</td>
                        <td>{trans_record.tokens}</td>
                        <td>{trans_record.gas}</td>
                    </tr>
                )
            }
        )
        return(
            <div>
                <table id = "hor-minimalist-b">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Transaction Hash</th>
                            <th>Tokens</th>
                            <th>Gas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trans_records_html}
                    </tbody>
                    
                </table>
            </div>
            
        )
    }
}

export default UserTransPage;