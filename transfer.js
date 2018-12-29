//how to transfer ETHER from account to another account and determine fee
var config = require('./config')
var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')
var Web3Utils = require('web3-utils')

const web3 = new Web3 (new Web3.providers.HttpProvider(config.endpoint));

const account1 = config.from; // Your account address 1
const account2 = config.to;// Your account address 2

const privateKey1 = Buffer.from(config.privkey, 'hex');
// const privateKey2 = Buffer.from('', 'hex')

var balance = Web3Utils.toHex(Web3Utils.toWei('0.1', 'ether'));
  var gasLimit = config.gasLimit;
  console.log("GasLimit:",gasLimit) 
    // web3.eth.getGasPrice(function(error, result){
    // var gasPrice = Web3Utils.fromWei(result);
  var gasPrice = config.gasPrice;
  console.log("Gasprice:",gasPrice);
  var gasValue = gasLimit * gasPrice
  console.log("Transaction fee:",gasValue);
  var valueToSend = balance - gasValue; 
  console.log("Max Value To Send:",valueToSend);

web3.eth.getTransactionCount(account1, (err, txCount) => {
    const txObject = {
        nonce:    Web3Utils.toHex(txCount),
        from:     account1,     
        to:       account2,
        value:    balance,
        gasLimit: config.gasLimit,
        gasPrice: config.gasPrice
    } 
    // console.log(txObject);
  
// web3.eth.getTransactionCount(account1, (err, txCount) => {
//   // Build the transaction
//   const txObject = {
//     nonce:    Web3Utils.toHex(txCount),
//     to:       account2,
//     value:    Web3Utils.toHex(Web3Utils.toWei('0.1', 'ether')),
//     gasLimit: Web3Utils.toHex(21000),
//     gasPrice: Web3Utils.toHex(Web3Utils.toWei('10', 'gwei'))
//   }

//   // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')
//   console.log(raw);

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    if (err) {
        console.log('err:', err);
    }
    else {
        console.log('txHash:', txHash);
    }
    // Now go check etherscan to see the transaction!
  });
});
// });