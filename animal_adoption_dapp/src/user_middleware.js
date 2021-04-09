//user
export function signUp(username,passsword){
    return {success: true, msg: "sign up successfully!"};
}

export function isUniqueName(name){
    return true;
}

export function signIn(username, passsword){
    return {success: true, msg: "sign in successfully!"};
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