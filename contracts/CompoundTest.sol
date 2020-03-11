pragma solidity >=0.5.0 <0.7.0;

contract Ceth {
    function mint() external payable;
}

contract Erc20 {
    function approve(address, uint256) external returns (bool);
    function transfer(address, uint256) external returns (bool);
}

contract CErc20 {
    function mint(uint256) external returns (uint256);
}

contract CompoundTest {
    function supplyEthToCompound(address payable _cEtherContract)
        public
        payable
        returns (bool)
    {
        Ceth(_cEtherContract).mint.value(msg.value).gas(250000)();
        return true;
    }
    function supplyErc20ToCompound(
        address _erc20Contract,
        address _cErc20Contract,
        uint256 _numTokensToSupply
    ) public returns (uint256) {
        // Create a reference to the underlying asset contract, like DAI.
        Erc20 underlying = Erc20(_erc20Contract);

        // Create a reference to the corresponding cToken contract, like cDAI
        CErc20 cToken = CErc20(_cErc20Contract);

        // Approve transfer on the ERC20 contract
        underlying.approve(_cErc20Contract, _numTokensToSupply);

        // Mint cTokens and return the result
        uint256 mintResult = cToken.mint(_numTokensToSupply);
        return mintResult;
    }
}
