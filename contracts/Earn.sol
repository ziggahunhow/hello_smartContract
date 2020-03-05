pragma solidity >=0.4.21 <0.7.0;

contract Earn {
    address private administrator;
    mapping(address => uint256) public balances;

    constructor() public {
        administrator = msg.sender;
    }

    function userDeposit(uint256 deposit) public {
        balances[msg.sender] = balances[msg.sender] + deposit;
        emit Deposit(msg.sender, deposit);
    }

    function userWithdraw(uint256 withdrawAmount) public {
        balances[msg.sender] = balances[msg.sender] - withdrawAmount;
        emit Withdraw(msg.sender, withdrawAmount);
    }

    event Deposit(address indexed sender, uint256 value);
    event Withdraw(address indexed sender, uint256 value);
}