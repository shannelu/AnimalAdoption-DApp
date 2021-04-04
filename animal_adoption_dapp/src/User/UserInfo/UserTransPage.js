import React from 'react';
import {getAllMyTransRecords} from '../user_middleware'
import {PageHeader, Table, Badge} from 'antd'
import "./transTable.css"

const columns = [
    {title : "Date", dataIndex : "date"},
    {title : "Transaction number", dataIndex : "t_num"},
    {title : "From", dataIndex : "from"},
    {title : "To", dataIndex : "to"},
    {title : "Token", dataIndex : "tokens"},
    {title : "Status", dataIndex : "status", 
        render : (stat) => (
            <Badge status = {stat} text = {stat}/>
        )
    }
]

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
        var trans_records = this.getMyTransRecords()
        return(
            <div>
                <PageHeader title = "My transactions" />
                <Table
                    dataSource = {trans_records}
                    columns = {columns}
                />
            </div>
        )
    }
}

export default UserTransPage;