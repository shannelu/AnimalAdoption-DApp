//user
var username = "Otis";
var password = "Oliver";
var total_token = 10;

export function signUp(username,passsword){
    return {success: true, msg: "sign up successfully!", free_token:1};
}

export function isUniqueName(username){
    return username == "111";
}

export function signIn(input_username, input_password){
    return input_username == username && input_password == password;
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

export function getAllMyTransRecords(uuid){
    return [
        {
            from: "Shanny",
            to: 'Oliver',
            hash: "0x1",
            tokens: 1,
            gas: 1
        },
        {
            from: "Julia",
            to: 'Oliver',
            hash: "0x2",
            tokens: 2,
            gas: 2
        },
        {
            from: "Oliver",
            to: 'Bevis',
            hash: "0x3",
            tokens: 3,
            gas: 3
        }
    ]
}

export function signOut(uuid){
    return true;
}