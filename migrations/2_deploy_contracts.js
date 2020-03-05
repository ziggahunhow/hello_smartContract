const Earn = artifacts.require("./Earn.sol");

module.exports = function(deployer) {
  deployer.deploy(Earn);
};
