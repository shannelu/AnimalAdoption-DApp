import React from 'react';
import {Form, DatePicker, Select, Cascader, Input, Space, Button} from 'antd';
import moment from 'moment';
import {post} from "../user_middleware"
const {Option} = Select;

const layout = {
    labelCol: { span: 5},
    wrapperCol: { span: 10 },
    labelAlign: "left"
};

const options = [
    {
        value: "AB",
        label: "Alberta",
        children: [
            {
                value: "Calgary",
                label: "Calgary",
            },
            {
                value: "Edmonton",
                label: "Edmonton",
            }
        ]
    },
    {
        value: "BC",
        label: "Biritsh Columbia",
        children: [
            {
                value: "Vancouver",
                label: "Vancouver",
            },
            {
                value: "Victoria",
                label: "Victoria",
            }
        ]
    },
    {
        value: "ON",
        label: "Ontario",
        children:[
            {
                value: "Ottawa",
                label: "Ottawa",
            },
            {
                value: "Toronto",
                label: "Toronto"
            },
            {
                value: "Waterloo",
                label: "Waterloo"
            }
        ]
    },
    {
        value: "QC",
        label: "Quebec",
        children: [
            {
                value: "Montreal",
                label: "Montreal",
            },
            {
                value: "Quebec City",
                label: "Quebec City",
            }
        ]
    }
]

class PostInfoPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    disabledDate(current){
        return current > moment().endOf('day');
    }

    post(){
        var date = document.getElementById("date").value;
        var type = document.getElementById("type").value;
        var city = document.getElementById("city").value;
        var street = document.getElementById("street").value;
        var description = document.getElementById("description").value;
        post(date,type,city,street,null,description);
    }

    render(){
        return(
            <Form {...layout} onFinish = {()=>this.post()}>
                <h1>Thank you for your warm heart! Provide detailed information about this little thing!</h1>
                <Form.Item label = "When did you find it?" rules={[{ required: true, message: 'Please select a date!' }]} >
                    <DatePicker 
                        id = "date"
                        showTime
                        disabledDate = {this.disabledDate}
                        style = {{width:300}}
                    />
                </Form.Item>
                <Form.Item label = "What type is it?" rules={[{ required: true, message: 'Please select a type!' }]} >
                    <Select
                        id = "type"
                        style = {{width : 300}}
                        placeholder = "Select animal type"
                    >
                        <Option value = "cat">Cat</Option>
                        <Option value = "dog">Dog</Option>
                    </Select>
                </Form.Item>
                <Form.Item label = "Where are you" rules={[{ required: true, message: 'Please input your location!' }]} >
                    <Space>
                        <Cascader id = "city" placeholder = "Select your city" options = {options} style = {{width:140}}/>
                        <Input id = "street" placeholder = "Street name" style = {{width:152}}></Input>
                    </Space>
                </Form.Item>
                <Form.Item label = "Description" rules={[{ required: true, message: 'This is a required field!' }]} >
                    <Input.TextArea id = "description" 
                                    placeholder = "Tell us more about this little thing~" 
                                    allowClear
                                    showCount
                                    maxLength = {200}
                                    />
                </Form.Item>
                <Form.Item>
                    <Button type = "primary" htmlType = 'submit' >Post</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default PostInfoPage