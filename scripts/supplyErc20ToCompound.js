const Web3 = require("web3");

const web3 = new Web3("http://127.0.0.1:8545");
const CompoundTestAbi = require("../abi/CompoundTest.json");
const compoundCDaiContractAbi = require("../abi/compoundCDaiContractAbi.json");
const CompoundTestAddress = "0x0Bb909b7c3817F8fB7188e8fbaA2763028956E30"; // check this address afte truffle migration!
const daiMainNetAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const compoundCDaiContractAddress =
  "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643";
const compoundCDaiContract = new web3.eth.Contract(
  compoundCDaiContractAbi,
  compoundCDaiContractAddress
);

web3.eth
  .getAccounts()
  .then(ganacheAccounts => {
    accounts = ganacheAccounts;
    CompoundTestContract = new web3.eth.Contract(
      CompoundTestAbi,
      CompoundTestAddress
    );
    return CompoundTestContract.methods
      .supplyErc20ToCompound(
        daiMainNetAddress,
        compoundCDaiContractAddress,
        web3.utils.toWei("20", "ether") // 10 DAI to supply
      )
      .send({
        from: accounts[0],
        gasLimit: web3.utils.toHex(5000000), // posted at compound.finance/developers#gas-costs
        gasPrice: web3.utils.toHex(20000000000) // use ethgasstation.info (mainnet only)
      });
  })
  .then(result => {
    console.log("result:", result);
    console.log("DAI supply to compound success");
    return compoundCDaiContract.methods.balanceOfUnderlying(accounts[0]).call();
  })
  .then(balanceOfUnderlying => {
    balance = web3.utils.fromWei(balanceOfUnderlying).toString();
    console.log("DAI supplied to the Compound Protocol:", balance);
    return compoundCDaiContract.methods.balanceOf(accounts[0]).call();
  })
  .then(cTokenBalance => {
    console.log("MyContract's cDAI Token Balance:", cTokenBalance / 1e8);
  })
  .catch(err => {
    console.log("err:", err);
  });
