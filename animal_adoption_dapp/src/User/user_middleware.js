//user
export function signUp(username,passsword){
    return {success: true, msg: "sign up successfully!", free_token:1};
}

export function signIn(username, password){
    return {success: true, msg: "sign in successfully!", name: username, pwd: password};
}

export function getMyUsername(uuid){
    return "test_user_name";
}

export function setMyUsername(uuid, new_name){
    return {success: true, msg: "set up new username successfully!"};
}

export function setMyPassword(uuid, new_password){
    return {success: true, msg: "set up new password successfully!"};
}

export function getMyTotalToken(uuid){
    return 100;
}

export function signOut(uuid){
    return true;
}