//transaction

export function transfer(animal_id, from, to){
    return {success: true, trans_hash: "test_trans_hash"};
}

export function getAllAnimalInfo(animal_id){
    return [
        {
            animal_id: "001",
            x: 199.00,
            y: 198.00,
            contactUserName: "Jessica",
            price: 1000,
            // imageBase64: ,
            // title: ,
            description: "..."
        }
    ]
}

export function getAllConfirmOrder(uuid, order_number){
    return [
        {
            animal_id: "001",
            x: 199.00,
            y: 198.00,
            contactUserName: "Jessica",
            price: 1000,
            // imageBase64: ,
            // title: ,
            description: "..."
        }
    ]
}
