require("dotenv").config();
const Web3 = require("web3");

const daiAbi = require("./build/contracts/Dai.json");
const daiMainNetAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const daiMcdJoin = "0x9759A6Ac90977b93B58547b4A71c78317f391A28";
let daiContract;
let accounts;

const web3 = new Web3("http://127.0.0.1:8545");

web3.eth
  .getAccounts()
  .then(ganacheAccounts => {
    accounts = ganacheAccounts;
    daiContract = new web3.eth.Contract(daiAbi, daiMainNetAddress);

    // 500 DAI
    const numbDaiToMint = web3.utils.toWei("500", "ether");

    return daiContract.methods.mint(accounts[0], numbDaiToMint).send({
      from: daiMcdJoin,
      gasPrice: web3.utils.toHex(0)
    });
  })
  .then(result => {
    console.log("DAI mint success");
    return daiContract.methods.balanceOf(accounts[0]).call();
  })
  .then(balanceOf => {
    const dai = web3.utils.fromWei(balanceOf, "ether");
    console.log("DAI amount in first Ganache account wallet:", dai);
  })
  .catch(err => {
    console.error(err);
  });
