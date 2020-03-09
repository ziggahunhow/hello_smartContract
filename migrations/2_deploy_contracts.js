const Earn = artifacts.require("./Earn.sol");
const NoobCoin = artifacts.require("./NoobCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(Earn);
  deployer.deploy(NoobCoin);
};
