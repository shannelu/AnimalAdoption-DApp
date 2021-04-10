import React from "react"
import UserProfilePage from "./UserProfilePage"
import UserTransPage from "./UserTransPage"
import TabsMenu from "./TabsMenu"
import Agent from "../../Agent/Agent"
import {Empty, Button} from 'antd'

var agent = new Agent(null,null);

class UserInfoPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            myAgent : null
        }
    }

    // static async getDerivedStateFromProps(props, state){
    //     await this.state.myAgent.initialize();
    //     console.log("hello")
    //     return {myAgent : this.state.myAgent}
    // }

    async componentDidMount(){
        await agent.initialize()
        agent.uuid = localStorage.getItem(agent.uuid)
        console.log("hello");
        this.setState({
            myAgent: agent
        })
    }

    render(){
        if(agent.uuid == null){
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