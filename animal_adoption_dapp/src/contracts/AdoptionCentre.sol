// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;
pragma abicoder v2;

import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

contract AdoptionCentre is ERC20, ERC20Burnable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 amount
    )
    ERC20Burnable()
    ERC20(name, symbol)
    {
        _mint(msg.sender, amount * (10 ** decimals()));
    }

    struct UserInfo {
        string userName;
        bytes32 passHash;
        uint256 tokens;
        address accountAddress;
        uint256[] postedAnimalIndex;
        uint256[] transactionIndex;
    }

    // longitude = (longitude from js) * 10^6
    // latitude = (latitude from js) * 10^6
    struct AnimalInfo {
        bytes32 animalID;
        int64 longitude;
        int64 latitude;
        string contactUserName;
        uint256 price;
        string imageBase64;
        string title;
        string description;
        // status = "MISSING", "FOUND"
        string status;
    }

    struct TransactionInfo {
        address from;
        address to;
        uint256 animalIndex;
    }

    // username to user information
    mapping (address => UserInfo) users;
    // uuid to username
    mapping (address => bytes32) activeUsers;

    // all animal information
    AnimalInfo[] animalInfos;
    // all transaction inforamtion
    TransactionInfo[] transactionInfos;

    // Events
    // eventType = "ANIMAL_INFO_OPS", "USER_ACTIVE", "TRANSACTION", "REGISTRATION", "LOGOUT", "PASSWORDRESET"
    event OperationEvents(string eventType, string eventMsg, bool success);
    event AcquireUserInfo(string userName, address addr);
    event LoginEvent(bytes32 uuid, string eventMsg, bool success);

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
            emit OperationEvents("PASSWORDRESET", "Old password does not match!", false);
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

    function adoptAnimal(address _seller, uint256 _index, bytes32 uuid) public returns(bool) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            return false;
        }
        AnimalInfo storage animal = animalInfos[_index];
        if (!compareStrings(animal.status, "MISSING")) {
            emit OperationEvents("TRANSACTION", "Requested animal has already been adopted!", false);
            return false;
        }
        uint256 buyerBalance = getBalanceof(msg.sender);
        if (buyerBalance < animal.price) {
            emit OperationEvents("TRANSACTION", "Buyer has insufficient fund for this payment!", false);
            return false;
        }

        approve(msg.sender, animal.price);

        if (transferFrom(msg.sender, _seller, animal.price)){
            animal.status = "FOUND";
            TransactionInfo memory trans;
            trans.from = msg.sender;
            trans.to = _seller;
            trans.animalIndex = _index;
            transactionInfos.push(trans);
            emit OperationEvents("TRANSACTION", "Transaction success!", true);
            return true;
        } else {
            emit OperationEvents("TRANSACTION", "Transaction failed with unknown cause!", false);
            return false;
        }
        
    }

    function postAnimalInfo(int64 _longitude, int64 _latitude, uint256 _price, string memory _imageBase64, string memory _title, string memory _description, bytes32 uuid) public returns(bool) {
        if (!checkUUID(msg.sender, uuid)) {
            emit OperationEvents("USER_ACTIVE", "User is not login, request is refused", false);
            return false;
        }
        AnimalInfo memory info;
        info.animalID = hash(_title);
        info.longitude = _longitude;
        info.latitude = _latitude;
        info.price = _price;
        info.imageBase64 = _imageBase64;
        info.title = _title;
        info.description = _description;
        info.status = "MISSING";
        address userAddr = msg.sender;
        UserInfo storage userInfo = users[userAddr];
        info.contactUserName = userInfo.userName;
        animalInfos.push(info);
        uint256 loc = animalInfos.length - 1;
        uint256[] storage animalSerial = userInfo.postedAnimalIndex;
        animalSerial.push(loc);
        emit OperationEvents("ANIMAL_INFO_OPS", "Animal information added successfully!", true);
        return true;
    }

    function getUserInfo(bytes32 uuid) public view returns(bool, string memory, address) {
        if (!checkUUID(msg.sender, uuid)) {
            return (false, "User is not login, request is refused", msg.sender);
        }
        return (true, users[msg.sender].userName, msg.sender);
    }

    function issueFreeTokens(uint256 _tokens, address _to) public {
        approve(_to, _tokens);
        transfer(_to, _tokens);
    }

    function register(string memory _userName, string memory _password, uint256 _tokens) public payable returns(bool) {
        UserInfo storage user = users[msg.sender];
        if (!compareStrings(user.userName, "")) {
            OperationEvents("REGISTRATION", "There is an existing user!", false);
            return false;
        }
        user.userName = _userName;
        user.passHash = hash(_password);
        user.tokens = _tokens;
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
        emit LoginEvent('0', "Login failed!", false);
        return false;
    }

    // Token operation funcs
    function getBalanceof(address _accountAddr) public view returns(uint256) {
        return balanceOf(_accountAddr);
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
