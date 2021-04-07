import React from "react"
import UserProfilePage from "./UserProfilePage"
import UserTransPage from "./UserTransPage"
import TabsMenu from "./TabsMenu"

class UserInfoPage extends React.Component{
    render(){
        return(
            <div className = "UserInfo">
                <TabsMenu>
                    <UserProfilePage name = "My Profile" uuid = "100"></UserProfilePage>
                    <UserTransPage name = "My Transactions" uuid = "100"> </UserTransPage>
                </TabsMenu>
            </div>
        )
    }
}

export default UserInfoPage