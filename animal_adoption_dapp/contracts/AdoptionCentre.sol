// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

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
    }

    // username to user information
    mapping (address => UserInfo) users;
    // uuid to username
    mapping (bytes32 => address) activeUsers;


    function getUserInfo(string memory _userName, address _accountAddress, bytes32 uuid) public returns(string memory, uint256, bool) {
        if (!checkUUID(_accountAddress, uuid)) {
            return ("", 0, false);
        }
        return (users[_accountAddress].userName, users[_accountAddress].tokens, true);
    }

    function register(string memory _userName, string memory _password, uint256 _tokens, address _accountAddress) public {
        UserInfo storage user = users[_accountAddress];
        require(compareStrings(user.userName, ""), "There is an existing user!");
        user.userName = _userName;
        user.passHash = hash(_password);
        user.tokens = _tokens;
        user.accountAddress = _accountAddress;
        UserInfo storage newUser = users[_accountAddress];
    }

    function checkUUID(address _accountAddress, bytes32 uuid) public returns(bool) {
        address activeUserAddress = activeUsers[uuid];
        if (activeUserAddress == _accountAddress) {
            return true;
        }
        return false;
    }


    function confirmRegistration(string memory _userName, address _accountAddress) public returns(string memory) {
        UserInfo storage user = users[_accountAddress];
        if (compareStrings(user.userName, _userName) && user.accountAddress == _accountAddress) {
            return "Successfully create user!";
        } else {
            return  "Registration failed with unkown error!";
        }
        
    }

    function login(string memory userName, string memory password, address accountAddress, string memory timestamp) public returns(bytes32, string memory) {
        string memory currUserName = users[accountAddress].userName;
        bytes32 currPassword = users[accountAddress].passHash;
        if (currPassword == hash(password) && compareStrings(currUserName, userName)) {
            bytes memory uuid_b = abi.encode(userName);
            uuid_b = abi.encode(uuid_b, timestamp);
            bytes32 uuid = keccak256(uuid_b);
            activeUsers[uuid] = accountAddress;
            return (uuid, "Login success!");
        }
        return ("", "Wrong password or user name!");
    }

    function compareStrings(string memory a, string memory b) public view returns (bool) {
        return (keccak256(abi.encode((a))) == keccak256(abi.encode((b))));
    }

    function hash(string memory str) public view returns(bytes32) {
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
