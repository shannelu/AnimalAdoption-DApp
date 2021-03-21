import React from "react"
import UserProfilePage from "./UserProfilePage"
import UserTransPage from "./UserTransPage"
import TabsControl from "./TabsControl"

class UserInfoPage extends React.Component{
    render(){
        return(
            <div className = "UserInfo">
                <TabsControl>
                    <UserProfilePage name = "profile" uuid = "100"></UserProfilePage>
                    <UserTransPage name = "trans" uuid = "100"> </UserTransPage>
                </TabsControl>
            </div>
        )
    }
}

export default UserInfoPage