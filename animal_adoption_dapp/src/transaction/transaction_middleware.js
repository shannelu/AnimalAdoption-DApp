//transaction
var total_ether = 1000;
var total_token = 100;
var username = "Kevin";
var gasfee = 500;

export function getMyUsername(uuid){
    return username;
}

export function getMyTotalToken(uuid){
    return total_token;
}

export function getMyGasFee(){
    return gasfee;
}

// export function transfer(animal_id, from, to){
//     return {success: true, trans_hash: "test_trans_hash"};
// }

export function getAllAnimalInfo(animal_id){
    return [
        {
            animal_id: "001",  // Does it need to be here?
            x: 199.01,
            y: 198.02,
            contactUserName: "Jessica",
            price: 1000,
            sold: false,
            // imageBase64: ,   // add image later
            // title: ,
            description: "Please contact Jessica for further information."
        }
    ]
}

export function addTokens(uuid, from, to, amount){
    var success;
    if(amount <= total_ether){
        success = true;
        total_ether -= amount / 10**18;  // 'to' account total ether will increase correspondingly (notice: gas fee deduction)
        total_token += amount;
    }
    else{
        success = false;
    }
    return {success: success, trans_hash: "test_trans_hash"};
}

// export function getAllConfirmOrder(uuid, animal_id){   // order_number?
//     var success;
//     // var animal_info = getAllAnimalInfo(animal_id);
//     // if(animal_info.price <= total_token){
//     //     success = true;
//     //     total_token -= animal_info.price;  // 'to' account total ether will increase correspondingly (notice: gas fee deduction)
//     //     animal_info.sold = true;
//     //     // animal_info.order_num = "111"
//     // }
//     // else{
//     //     success = false;
//     // }
//     return {success: success};
// }
