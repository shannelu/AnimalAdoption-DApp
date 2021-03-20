import React from "react"

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