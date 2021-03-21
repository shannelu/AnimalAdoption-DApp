//user
var username = "Otis";
var password = "Oliver";
var total_token = 10;

export function signUp(username,passsword){
    return {success: true, msg: "sign up successfully!", free_token:1};
}

export function signIn(username, password){
    return {success: true, msg: "sign in successfully!", name: username, pwd: password};
}

export function getMyUsername(uuid){
    return username;
}

export function setMyUsername(uuid, new_name){
    username = new_name;
    return {success: true, msg: "set up new username successfully!"};
}

export function setMyPassword(uuid, old_password, new_password){
    var success, msg;
    if(old_password == password){
        success = true;
        msg = "You have reset your password!";
        password = new_password
    }
    else{
        success = false;
        msg = "Your password is incorrect!";
    }
    return {success: success, msg: msg};
}

export function getMyTotalToken(uuid){
    return total_token;
}

export function signOut(uuid){
    return true;
}