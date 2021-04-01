//transaction

export function transfer(animal_id, from, to){
    return {success: true, trans_hash: "test_trans_hash"};
}

export function getAllAnimalInfo(animal_id){
    return [
        {
            animal_id: "001",
            x: 199.01,
            y: 198.02,
            contactUserName: "Jessica",
            price: 1000,
            // imageBase64: ,
            // title: ,
            description: "Please contact Jessica for further information."
        }
    ]
}

export function addTokens(uuid, from, to, amount){
    return {success: true, trans_hash: "test_trans_hash"};
}

export function getAllConfirmOrder(uuid, order_number){
    return [
        {
            animal_id: "001",
            x: 199.01,
            y: 198.02,
            contactUserName: "Jessica",
            price: 1000,
            // imageBase64: ,
            // title: ,
            description: "Please contact Jessica for further information."
        }
    ]
}
