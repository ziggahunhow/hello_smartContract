import React, { useState } from "react";
import Web3 from "web3";
import { HelloAbi } from "./HelloAbi.js";

import "./App.css";

function App() {
  const web3 = new Web3(Web3.givenProvider);
  const contractAddress = "0x3516c1cac3D2ca9fA27049C7556B7694B2538A1E";
  const HelloContract = new web3.eth.Contract(HelloAbi, contractAddress);
  const [greeting, setGreeting] = useState(0);

  const setData = async e => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await HelloContract.methods.setGreeting(greeting).estimateGas();
    const result = await HelloContract.methods
      .setGreeting(greeting)
      .send({ from: account, gas });
    console.log("result", result);
  };

  const getData = async e => {
    e.preventDefault();
    const result = await HelloContract.methods.getGreeting().call();
    console.log("result", result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={setData}>
          <label>
            Set Data:
            <input
              type="text"
              name="greeting"
              value={greeting}
              onChange={e => setGreeting(e.target.value)}
            />
          </label>
          <input type="submit" value="Set Data" />
        </form>
        <br />
        <button onClick={getData} type="button">
          Get Data
        </button>
      </header>
    </div>
  );
}

export default App;
