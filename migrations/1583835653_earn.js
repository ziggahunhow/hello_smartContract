const Earn = artifacts.require("./Earn.sol");

module.exports = function(deployer) {
  deployer.deploy(
    Earn,
    "0xB8A25A3d08984DB07e49Dd8Fd320dF37B1BE7893",
    "0x9df7C98C933A0cB409606A3A24B1660a70283542"
  );
};
