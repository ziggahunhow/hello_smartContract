pragma solidity >=0.5.0 <0.7.0;

contract Erc20 {
    function approve(address, uint256) external returns (bool);
    function transfer(address, uint256) external returns (bool);
}

contract CErc20 {
    function mint(uint256) external returns (uint256);
}

contract NewEarn {
    // function sendTouch(uint256 erc20Amount) public returns (uint256) {
    //     // calculations of TOUCH need to be updated
    //     return erc20Amount;
    // }
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
        // sendTouch(_numTokensToSupply);
        return mintResult;
    }
}
