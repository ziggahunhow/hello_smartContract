pragma solidity >=0.5.9 <0.7.0;

// following the tutorial on https://github.com/makerdao/developerguides/blob/master/dai/dai-in-smart-contracts/README.md#:~:text=The%20Dai%20Stablecoin%20System%20involves,crypto%20assets)%20into%20the%20system.

interface DaiToken {
    function transfer(address dst, uint256 wad) external returns (bool);
    function balanceOf(address person) external view returns (uint256);
}

contract owned {
    DaiToken daiToken;
    address owner;

    constructor() public {
        owner = msg.sender;
        daiToken = DaiToken(0x8ad3aA5d5ff084307d28C8f514D7a193B2Bfe725);
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only the owner is allowed to call this function"
        );
        _;
    }
}

contract mortal is owned {
    function destroy() public onlyOwner {
        daiToken.transfer(owner, daiToken.balanceOf(address(this)));
        selfdestruct(msg.sender);
    }
}

contract RinkebyDaiFaucet is mortal {
    event Withdrawal(address indexed to, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    function withdraw(uint256 amount) public {
        require(amount <= 0.1 ether, "please request for less than 0.1 ether");
        require(
            daiToken.balanceOf(address(this)) >= amount,
            "Insufficient balance in the faucet"
        );
        daiToken.transfer(msg.sender, amount);
        emit Withdrawal(msg.sender, amount);
    }

    function() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}
