//to transfer ERC-20 Tokens

var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')
var Web3Utils = require('web3-utils') 
var fs = require('fs');
var abiArray = JSON.parse(fs.readFileSync('coin.json', 'utf-8'));

const web3 = new Web3 (new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/49ec18cc3e22418f9c8901d695d68f44'));

const main = async () => {

var fromAddress = "0xDc0ba17b3FD674F8372df48B84CB6b75f5451C0B";
var toAddress = "0xb5e77a7F21F5a063D35731535B4D538A25747C49";
// var transferAmount = 10000;
var count = await web3.eth.getTransactionCount(fromAddress);
// var abiArray = JSON.parse(fs.readFileSync('coin.json', 'utf-8'));
// var coursesContract = new web3.eth.Contract(abiArray)
var contractAddress = "0xf52a47a51260636102c6caed04fdb909b46768b3";
var contract = new web3.eth.Contract(abiArray,contractAddress);
var rawTransaction = {
    "from": fromAddress,
    "nonce": "0x" + count.toString(16),
    "gasPrice": "0x003B9ACA00",
    "gasLimit": "0x250CA",
    "to": contractAddress,
    "value": 0x0,
    "data": contract.methods.transfer(toAddress, Web3Utils.toWei('10', 'ether')).encodeABI(),
    "chainId": "0x03"
};

var privKey = new Buffer('F1B231303267FCFD236E279BA712CD457E5D917871FD25A414107618BFAD8120', 'hex');
var tx = new Tx(rawTransaction);

tx.sign(privKey);
var serializedTx = tx.serialize();

var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);

  // The balance may not be updated yet, but let's check
  balance = await contract.methods.balanceOf(myAddress).call();
  console.log(`Balance after send: ${balance}`);

}

main();