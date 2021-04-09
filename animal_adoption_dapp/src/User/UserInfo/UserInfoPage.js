import React from "react"
import UserProfilePage from "./UserProfilePage"
import UserTransPage from "./UserTransPage"
import TabsMenu from "./TabsMenu"
import Agent from "../../Agent/Agent"
import {Empty, Button} from 'antd'

class UserInfoPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            myAgent : new Agent(null,null)
        }
    }

    render(){
        this.state.myAgent.initialize()
        this.state.myAgent.uuid = localStorage.getItem(this.state.myAgent.myAccount)
        if(this.state.myAgent.uuid == null){
            return(
                <Empty
                    description = "You have not logged in!"
                >
                    <Button type = "primary" href = '/signin'>Log in now!</Button>
                </Empty>
            )
        }
        return(
            <div className = "UserInfo">
                <TabsMenu>
                    <UserProfilePage name = "My Profile" agent = {this.state.myAgent}></UserProfilePage>
                    <UserTransPage name = "My Transactions" agent = {this.state.myAgent}> </UserTransPage>
                </TabsMenu>
            </div>
        )
    }
}

export default UserInfoPage