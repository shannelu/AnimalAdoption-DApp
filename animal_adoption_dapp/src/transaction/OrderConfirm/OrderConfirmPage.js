// import React from 'react';
// import {getMyUsername, getMyTotalToken, getMyGasFee, getAllConfirmOrder} from '../transaction_middleware';
// import {Button, Form, message} from 'antd';

// class OrderConfirmPage extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             order_num : 0
//         }
//     }


//     getUsername(){
//         return getMyUsername(this.props.uuid);
//     }

//     getTotalToken(){
//         return getMyTotalToken(this.props.uuid);
//     }

//     getGasFee(){
//         return getMyGasFee(this.props.uuid);
//     }

//     getPrice(){
//         return getAllConfirmOrder(this.props.uuid, this.props.animal_id);
//     }
//     render(){
//         return(
//             <Form
//             name="addToknes"
//             className="AddTokensForm"
//             layout = "vertical"
//             initialValues={{ remember: true }}
//             // onFinish = {()=>this.addMyTokens()}
//             >
//                 <h2>Add Tokens</h2>
//                 {/* <h2>Confirm your personal information</h2>     */}
//                 <Form.Item id = "username" label="Username">
//                 </Form.Item>
//                 <b>{this.getUsername()}</b>
//                 <Form.Item id = "price" label="Price">
//                 <b>{this.getPrice()}</b>
//                 </Form.Item>
//                 <Form.Item id = "gasfee" label="Gas Fee (Tokens)">
//                 <b>{this.getGasFee()}</b>
//                 </Form.Item>
//                 <Form.Item>
//                     <Button type="primary" htmlType = 'submit'  className="login-form-button">
//                     Confirm and Pay
//                     </Button><br/>
//                     <p></p>
//                     <Button type="primary" htmlType = 'submit'  className="login-form-button">
//                     Return to Last Page
//                     </Button><br/>
//                 </Form.Item>
//             </Form>   
//         )
//     }
// }

// export default OrderConfirmPage;