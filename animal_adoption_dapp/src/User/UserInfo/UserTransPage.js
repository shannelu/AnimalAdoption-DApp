import React from 'react';
import {getAllMyTransRecords} from '../user_middleware'
import {PageHeader, Table, Badge, Pagination} from 'antd'
import "./transTable.css"

const columns = [
    {title : "Date", dataIndex : "date", width: 150},
    {title : "Transaction number", dataIndex : "t_num",  width: 150},
    {title : "From", dataIndex : "from",  width: 150},
    {title : "To", dataIndex : "to",  width: 150},
    {title : "Token", dataIndex : "tokens",  width: 150},
    {title : "Status", dataIndex : "status", 
        render : (stat) => (
            <Badge status = {stat} text = {stat == "success" ? "success" : "pending"}/>
        ),
        width: 150
    }
]

var trans_records = [];

class UserTransPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trans_num : 0,
            current : 1,
            myAgent: this.props.agent
        }
    }

    getMyTransRecords(){
        return this.state.myAgent.getTransRecords();
    }

    changePage = (page,pageSize) => {
        console.log(page);
    }

    render(){
        trans_records = this.getMyTransRecords()
        return(
            <div>
                <PageHeader title = "My transactions" />
                <Table
                    dataSource = {trans_records}
                    columns = {columns}
                    pagination = {
                        {
                            position : ['bottomCenter'], 
                            total : trans_records.length,
                            pageSize : 3,
                            responsive : false,
                            showTotal : total => `Total ${total} items`
                        }
                    }
                />
            </div>
        )
    }
}

export default UserTransPage;