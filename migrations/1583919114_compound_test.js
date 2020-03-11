const CompoundTest = artifacts.require("./CompoundTest.sol");

module.exports = function(deployer) {
  deployer.deploy(CompoundTest);
};
