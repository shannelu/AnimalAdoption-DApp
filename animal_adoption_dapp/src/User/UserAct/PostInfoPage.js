import React from 'react';
import {Form, DatePicker, Select, Cascader, Input, Space, Button, message, InputNumber} from 'antd';
import moment from 'moment';
import Agent from '../../Agent/Agent'
import {UploadOutlined} from '@ant-design/icons'
const {Option} = Select;

var imgUrlBase64 = [];

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

const imgChange = e => {
    var fileList = e.target.files;
    var file_num = fileList.length;
    var AllowImgFileSize = 2100000;
    for(let i = 0; i < fileList.length;i++){
        let reader = new FileReader();
        reader.readAsDataURL(fileList[i]);
        reader.onload = function(e){
            if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                message.error("file size exceeds 2MB!");
                return;
            }else{
                console.log(reader.result)
                imgUrlBase64.push(reader.result);
            }
            return;
        }
    }
    message.success(`${file_num} file${file_num > 1 ? "s" : ""} ha${file_num > 1 ? "ve" : "s"} been successfully uploaded`);
    console.log(imgUrlBase64);
}

const upload = ()=>{
    //message.success("clicked");
    document.getElementById("myimg").click();
}

class PostInfoPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myAgent : new Agent(null, null)
        }
    }

    disabledDate(current){
        return current > moment().endOf('day');
    }

    async post(){
        this.state.myAgent.initialize();
        this.state.myAgent.uuid = localStorage.getItem(this.state.myAgent.myAccount);
        var date = document.getElementById("date").value;
        var title = document.getElementById("title").value;
        var city = document.getElementById("city").value;
        var street = document.getElementById("street").value;
        var description = document.getElementById("description").value;
        var price = document.getElementById("price").value; // in gwei
        var longitude = document.getElementById("longitude").value;
        var latitude = document.getElementById("latitude").value;
        var transImage;
        if (imgUrlBase64.length == 0) {
            transImage = "";
        } else {
            transImage = imgUrlBase64[0];
        }
        
        let call = await this.state.myAgent.postAnimal(longitude, latitude, date, price, transImage, title, description);
        console.log("Post!!!");
        console.log(call);
    }

    render(){
        this.state.myAgent.initialize();
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        return(
            <Form {...layout} onFinish = {async ()=> this.post()}>
                <h1>Thank you for your warm heart! Provide detailed information about this little thing!</h1>
                <Form.Item label = "When did you find it?" rules={[{ required: true, message: 'Please select a date!' }]} >
                    <DatePicker 
                        id = "date"
                        showTime
                        disabledDate = {this.disabledDate}
                        style = {{width:300}}
                    />
                </Form.Item>
                <Form.Item label = "What title is it?" rules={[{ required: true, message: 'Please enter a title!' }]} >
                    <Input id = "title" placeholder = "write a title for your post" ></Input>
                </Form.Item>
                <Form.Item label = "Where are you" rules={[{ required: true, message: 'Please input your location!' }]} >
                    <Space>
                        <Cascader id = "city" placeholder = "Select your city" options = {options} style = {{width:140}}/>
                        <Input id = "street" placeholder = "Street name" style = {{width:152}}></Input>
                    </Space>
                </Form.Item>
                <Form.Item label = "longitude" rules={[{ required: true, message: 'Please enter a longitude!' }]} >
                    <Input id = "longitude" placeholder = "longitude"></Input>
                </Form.Item>
                <tr>
                    <td>Current longitude is: </td>
                    <td>{lng}</td>
                </tr>
                <Form.Item label = "latitude" rules={[{ required: true, message: 'Please enter a latitude!' }]} >
                    <Input id = "latitude" placeholder = "latitude"></Input>
                </Form.Item>
                <tr>
                    <td>Current latitude is: </td>
                    <td>{lat}</td>
                </tr>
                <Form.Item hidden = {true}>
                    <Input type = "file" id = "myimg" multiple = 'multiple' onChange = {imgChange} style = {{visibility:'hidden'}}></Input>
                </Form.Item>
                <Form.Item>
                    <Button icon = {<UploadOutlined/>} id = "test" onClick = {upload}>Upload some pictures about it!</Button>
                </Form.Item>
                <Form.Item label = "how much does it cost to adopt it?(Ether)">
                    <InputNumber id = "price" min = {1} max = {100} defaultValue = {1} step = {1}/>
                </Form.Item>
                <Form.Item layout = 'horizontal' label = "Description" rules={[{ required: true, message: 'This is a required field!' }]} >
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