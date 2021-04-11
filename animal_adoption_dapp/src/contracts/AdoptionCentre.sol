// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;
pragma abicoder v2;

contract AdoptionCentre {

    constructor() {

    }

    struct UserInfo {
        string userName;
        bytes32 passHash;
        address accountAddress;
        uint256 adoptedNum;
        uint256 userNameIndex;
    }

    // longitude = (longitude from js) * 10^6
    // latitude = (latitude from js) * 10^6
    struct AnimalInfo {
        uint256 animalID;
        string longitude;
        string latitude;
        string contactUserName;
        uint64 price;
        string imageBase64;
        string title;
        string description;
        // status = "MISSING", "FOUND"
        string status;
        address payable seller;
        string time;
        string physicalAddress;
    }

    struct TransactionInfo {
        address from;
        address to;
        string fromUser;
        string toUser;
        string time;
        uint256 animalIndex;
        string animalTitle;
        uint64 animalPrice;
    }

    // user address to user information
    mapping (address => UserInfo) users;
    // user address to username
    mapping (address => bytes32) activeUsers;
    // user address to user related transaction information
    mapping (address => TransactionInfo[]) transRecords;
    // user address to user related posted animal information
    mapping (address => AnimalInfo[]) postAnimalRecords;

    // all animal information
    AnimalInfo[] animalInfos;

    // all existing user name
    string[] userNames;

    // Events
    // eventType = "ANIMAL_INFO_OPS", "USER_ACTIVE", "TRANSACTION", "REGISTRATION", "LOGOUT", "PASSWORD_RESET", "USERNAME_RESET"
    event OperationEvents(string eventType, string eventMsg, bool success);
    event AcquireUserInfo(string userName, address addr);
    event LoginEvent(bytes32 uuid, string eventMsg, bool success);
    event TransactionRecords(TransactionInfo[] records, string eventMsg, bool success);

    function payment() public payable {

    }

    function getAdoptedNum(bytes32 uuid) public view returns(uint256) {
        UserInfo storage user = users[msg.sender];
        return user.adoptedNum;
    }

    function resetUserName(string memory newName, bytes32 uuid) public returns(bool) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            return false;
        }
        UserInfo storage user = users[msg.sender];
        user.userName = newName;
        emit OperationEvents("USERNAME_RESET", "Username reset success!", true);
        return true;
    }

    function getMyBalance(bytes32 uuid) public returns(bool, string memory, uint256) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            return (false, "Get user balance failed!", 0);
        }
        return (true, "Get user balance success!", msg.sender.balance);
    }

    // Get user transaction records
    function getTransRecords(bytes32 uuid) public returns(TransactionInfo[] memory, string memory, bool, uint256) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            TransactionInfo[] memory tmp;
            return (tmp, "Get transactions failed!", false, 0);
        }
        return (transRecords[msg.sender], "Get transactions!", true, transRecords[msg.sender].length);
    }

    // function getOneAnimalInfo(uint256 _index, bytes32 uuid) public returns(AnimalInfo memory, string memory, bool) {
    //     if (!checkUUID(msg.sender, uuid)) {
    //         emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
    //         AnimalInfo memory tmp;
    //         return (tmp, "Get animal info failed!", false);
    //     }
    //     return (animalInfos[_index], "Get one animal info!", true);
    // }

    function getPostedAnimal(bytes32 uuid) public returns(AnimalInfo[] memory, string memory, bool, uint256) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            AnimalInfo[] memory tmp;
            return (tmp, "Get animal info failed!", false, 0);
        }
        return (postAnimalRecords[msg.sender], "Get posted animal information!", true, postAnimalRecords[msg.sender].length);
    }

    // Reset password
    function resetPassword(string memory _old_password, string memory _new_password, bytes32 uuid) public returns(bool) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            return false;
        }
        bytes32 new_pass_hash = hash(_new_password);
        bytes32 old_pass_hash = hash(_old_password);
        UserInfo storage user = users[msg.sender];
        if (old_pass_hash != user.passHash) {
            emit OperationEvents("PASSWORD_RESET", "Old password does not match!", false);
            return false;
        }
        user.passHash = new_pass_hash;
        emit OperationEvents("PASSWORDRESET", "Password reset success!", true);
        return true;
    }

    // User operation funcs
    function logout(bytes32 uuid) public {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            return;
        }
        delete activeUsers[msg.sender];
        emit OperationEvents("LOGOUT", "User should be logout", true);
    }

    function getAnimalNearBy(int64 top, int64 bottom, int64 left, int64 right, int64 radius, bytes32 uuid) public returns(AnimalInfo[] memory, uint256, bool) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            AnimalInfo[] memory tmp;
            return (tmp, 0, false);
        }
        return (animalInfos, animalInfos.length, true);
    }

    // function depositPayment(uint256 _index) public payable {
    //     AnimalInfo storage animal = animalInfos[_index];
        
    // }

    function adoptAnimal(uint256 _index, string memory _time, bytes32 uuid) public payable returns(bool) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            msg.sender.transfer(msg.value);
            return false;
        }
        AnimalInfo storage animal = animalInfos[_index];
        if (!compareStrings(animal.status, "MISSING")) {
            emit OperationEvents("TRANSACTION", "Requested animal has already been adopted!", false);
            msg.sender.transfer(msg.value);
            return false;
        }

        address _sender = msg.sender;
        uint256 buyerBalance = _sender.balance;
        if (buyerBalance < msg.value) {
            emit OperationEvents("TRANSACTION", "Buyer has insufficient fund for this payment!", false);
            msg.sender.transfer(msg.value);
            return false;
        }

        // if (msg.value < animal.price) {
        //     emit OperationEvents("TRANSACTION", "Buyer has not payed enough ether for this payment!", false);
        //     return false;
        // }

        

        UserInfo storage userInfo = users[msg.sender];

        if (compareStrings(userInfo.userName, animal.contactUserName)) {
            emit OperationEvents("TRANSACTION", "Cannot adopt your own animal!", false);
            msg.sender.transfer(msg.value);
            return false;
        }

        animal.status = "FOUND";
        TransactionInfo memory trans;
        trans.time = _time;
        trans.fromUser = userInfo.userName;
        trans.from = msg.sender;
        trans.toUser = animal.contactUserName;
        trans.to = animal.seller;
        trans.animalIndex = _index;
        trans.time = animal.time;
        trans.animalTitle = animal.title;
        trans.animalPrice = animal.price;
        transRecords[msg.sender].push(trans);
        transRecords[animal.seller].push(trans);
        userInfo.adoptedNum++;
    
        animal.seller.transfer(msg.value);
        emit OperationEvents("TRANSACTION", "Transaction success!", true);
        return true;
        
    }

    function postAnimalInfo(string memory _longitude, string memory _latitude, uint64 _price, string memory _imageBase64, string memory _title, string memory _description, string memory _time, string memory _physicalAddress, bytes32 uuid) public returns(bool) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            return false;
        }

        for (uint256 i = 0; i < animalInfos.length; i++) {
            if (compareStrings(animalInfos[i].longitude, _longitude)) {
                if (compareStrings(animalInfos[i].latitude, _latitude)) {
                    emit OperationEvents("ANIMAL_INFO_OPS", "Duplicate location!", false);
                    return false;
                }
                
            }
        }

        UserInfo storage userInfo = users[msg.sender];

        AnimalInfo memory info;
        info.animalID = animalInfos.length;
        info.longitude = _longitude;
        info.latitude = _latitude;
        info.price = _price;
        info.imageBase64 = _imageBase64;
        info.title = _title;
        info.description = _description;
        info.status = "MISSING";
        info.seller = msg.sender;
        info.contactUserName = userInfo.userName;
        info.time = _time;
        info.physicalAddress = _physicalAddress;
        
        animalInfos.push(info);
        postAnimalRecords[msg.sender].push(info);
        // uint256 loc = animalInfos.length - 1;
        // uint256[] storage animalSerial = userInfo.postedAnimalIndex;
        // animalSerial.push(loc);
        emit OperationEvents("ANIMAL_INFO_OPS", "Animal information added successfully!", true);
        return true;
    }

    function getUserName(bytes32 uuid) public returns(bool, string memory, address) {
        if (!checkUUID(msg.sender, uuid)) {
            return (false, "User is not login, request is refused", msg.sender);
        }
        return (true, users[msg.sender].userName, msg.sender);
    }

    function register(string memory _userName, string memory _password) public returns(bool) {
        UserInfo storage user = users[msg.sender];
        if (!compareStrings(user.userName, "")) {
            OperationEvents("REGISTRATION", "There is an existing user!", false);
            return false;
        }

        for (uint256 i = 0; i < userNames.length; i++) {
            if (compareStrings(userNames[i], _userName)) {
                 OperationEvents("REGISTRATION", "There is an existing user name!", false);
                 return false;
            }
        }
        userNames.push(_userName);

        user.userNameIndex = userNames.length - 1;
        user.userName = _userName;
        user.passHash = hash(_password);
        user.accountAddress = msg.sender;
        UserInfo storage newUser = users[msg.sender];
        if (compareStrings(newUser.userName, _userName)) {
            emit OperationEvents("REGISTRATION", "Registeration succeed!", true);
            return true;
        }
        emit OperationEvents("REGISTRATION", "Registeration failed with unknown error!", false);
        return false;
    }

    function login(string memory userName, string memory password, string memory timestamp) public returns(bool) {
        if (activeUsers[msg.sender] != 0) {
            emit LoginEvent('0', "User already login!", false);
            return false;
        }
        string memory currUserName = users[msg.sender].userName;
        bytes32 currPassword = users[msg.sender].passHash;
        if (currPassword == hash(password) && compareStrings(currUserName, userName)) {
            bytes memory uuid_b = abi.encode(userName);
            uuid_b = abi.encode(uuid_b, timestamp);
            bytes32 uuid = keccak256(uuid_b);
            activeUsers[msg.sender] = uuid;
            emit LoginEvent(uuid, "Login success!", true);
            return true;
        }
        emit LoginEvent('0', "Wrong username or password!", false);
        return false;
    }

    // Helper funcs
    function checkUUID(address _accountAddr, bytes32 uuid) public view returns(bool) {
        bytes32 currUUID = activeUsers[_accountAddr];
        if (currUUID == uuid) {
            return true;
        }
        return false;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encode((a))) == keccak256(abi.encode((b))));
    }

    function hash(string memory str) public pure returns(bytes32) {
        return keccak256(abi.encode(str));
    }

    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}
