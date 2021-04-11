import React from 'react';
import {PageHeader, Table, Badge, Pagination} from 'antd';
import "./transTable.css"

const columns = [
    {title : "Date", dataIndex : "time", width: 100},
    {title : "Name", dataIndex : "animalTitle",  width: 100},
    {title : "Price(ether)", dataIndex : "animalPrice",  width: 100},
    {title : "From", dataIndex : "fromUser",  width: 100},
    {title : "To", dataIndex : "toUser",  width: 100}
]

// const fakeRecords = [{
//         from: "from_address_1",
//         to: "to_address_1",
//         fromUser: "from_username_1",
//         toUser: "to_username_1",
//         time: "time_1",
//         animalTitle: "Tudou",
//         animalPrice: "price_1"
//     },
//     {
//         from: "from_address_2",
//         to: "to_address_2",
//         fromUser: "from_username_2",
//         toUser: "to_username_2",
//         time: "time_2",
//         animalTitle: "Fanqie",
//         animalPrice: "price_2"
//     },{
//         from: "from_address_3",
//         to: "to_address_3",
//         fromUser: "from_username_3",
//         toUser: "to_username_3",
//         time: "time_3",
//         animalTitle: "Hongshu",
//         animalPrice: "price_3"
// }];

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

    expandedRowRender = (record,index) => {
        const columns = [
            {title: 'From', dataIndex: 'from', width:50},
            {title: 'To', dataIndex: 'to',width:50}
        ];
        return <Table columns = {columns} dataSource = {[record]} pagination = {false}/>
    }

    async componentDidMount(){
        var currRecords = await this.state.myAgent.getTransRecords();
        var records = [];
        var i = 0;
        console.log(currRecords);
        for (i = 0; i < currRecords.length; i++) {
            records.push({
                from: currRecords[i].from,
                to: currRecords[i].to,
                fromUser: currRecords[i].fromUser,
                toUser: currRecords[i].toUser,
                time: currRecords[i].time,
                animalTitle: currRecords[i].animalTitle,
                animalPrice: currRecords[i].animalPrice
            })
        }
        console.log(records);
        this.setState({
            records: records 
        })
        console.log(this.state.records);
    }

    render(){
        console.log(this.state.records);
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
                    expandable = {{ expandedRowRender: this.expandedRowRender}}
                />
            </div>
        )
    }
}

export default UserTransPage;