//user
var username = "Otis";
var password = "Oliver";
var total_token = 10;

export function signUp(username,passsword){
    return {success: true, msg: "sign up successfully!", free_token:1};
}

export function isUniqueName(username){
    return true;
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
            date: "3.30",
            t_num : 1,
            from: "Shanny",
            to: 'Oliver',
            tokens : 1,
            status : "processing",
            hash: "0x1",
            gas: 1
        },
        {
            date: "3.30",
            t_num : 2,
            from: "Julia ",
            to: 'Oliver',
            hash: "0x2",
            tokens: 2,
            status : "success",
            gas: 2
        },
        {
            date: "3.30",
            t_num : 3,
            from: "Oliver",
            to: 'Bevis ',
            hash: "0x3",
            tokens: 3,
            status : "success",
            gas: 3
        },
        {
            date: "3.30",
            t_num : 3,
            from: "Oliver",
            to: 'Bevis ',
            hash: "0x3",
            tokens: 3,
            status : "success",
            gas: 3
        },
        {
            date: "3.30",
            t_num : 3,
            from: "Oliver",
            to: 'Bevis ',
            hash: "0x3",
            tokens: 3,
            status : "success",
            gas: 3
        }
    ]
}

export function signOut(uuid){
    return true;
}

export function post(date, type, city, street, pic, description){
    console.log(date, type, city, street, pic, description);
}