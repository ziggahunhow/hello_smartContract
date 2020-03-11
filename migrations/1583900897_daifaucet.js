const RinkebyDaiFaucet = artifacts.require("./RinkebyDaiFaucet.sol");

module.exports = function(deployer) {
  deployer.deploy(RinkebyDaiFaucet);
};
