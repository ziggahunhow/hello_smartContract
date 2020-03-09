const NoobToken = artifacts.require("./NoobToken.sol");

module.exports = function(_deployer) {
  _deployer.deploy(NoobToken);
};
