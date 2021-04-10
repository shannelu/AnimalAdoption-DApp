import React from 'react';
import {getAllMyTransRecords} from '../user_middleware'
import {PageHeader, Table, Badge, Pagination} from 'antd'
import "./transTable.css"

const columns = [
    {title : "Date", dataIndex : "time", width: 150},
    {title : "From", dataIndex : "fromUser",  width: 150},
    {title : "To", dataIndex : "toUser",  width: 150}
]

class UserTransPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trans_num : 0,
            current : 1,
            records : [],
            myAgent: this.props.agent
        }
    }

    expandedRowRender = () => {
        const columns = [
            {title: 'From', dataIndex: 'from'},
            {title: 'To', dataIndex: 'to'}
        ];
        console.log(this.state.records);
        const data = this.state.records;
        return <Table columns = {columns} dataSource = {data} pagination = {false}></Table>
    }

    async getMyTransRecords(){
        return await this.state.myAgent.getFakeRecords();
    }

    async componentDidMount(){
        this.setState({
            records: await this.state.myAgent.getFakeRecords()
        })
    }

    render(){
        return(
            <div>
                <PageHeader title = "My transactions" />
                <Table
                    dataSource = {this.state.records}
                    columns = {columns}
                    pagination = {
                        {
                            position : ['bottomCenter'], 
                            total : this.state.records.length,
                            pageSize : 3,
                            responsive : false,
                            showTotal : total => `Total ${total} items`
                        }
                    }
                    expandable = {this.expandedRowRender}
                />
            </div>
        )
    }
}

export default UserTransPage;