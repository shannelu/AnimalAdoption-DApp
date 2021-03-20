import React from "react"
import UserProfilePage from "./UserProfilePage"
import UserTransPage from "./UserTransPage"
import TabsControl from "./TabsControl"

class UserInfoPage extends React.Component{
    render(){
        return(
            <div className = "UserInfo">
                <TabsControl>
                    <UserProfilePage name = "profile"></UserProfilePage>
                    <UserTransPage name = "trans"></UserTransPage>
                </TabsControl>
            </div>
        )
    }
}

export default UserInfoPage