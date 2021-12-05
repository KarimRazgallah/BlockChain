import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Token from '../abis/Token.json';
import { loadWeb3 } from '../store/interactions';
import { connect } from 'react-redux';

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    const web3 = loadWeb3(dispatch)
    await window.ethereum.enable();
    const network = await web3.eth.net.getNetworkType()
    const networkID = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()
    const abi = Token.abi
    const networks = Token.networks
    const token = new web3.eth.Contract(Token.abi, Token.networks[networkID].address)
    const totalSupply = await token.methods.totalSupply().call()
    console.log("totalSupply", totalSupply)
  }

  render() {
    return (
      <div className="App">
        hello
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App);