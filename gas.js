//to transfer ERC-20 Tokens and get to address and data using txHash
var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')
var Web3Utils = require('web3-utils') 
var fs = require('fs');
var abiArray = JSON.parse(fs.readFileSync('coin.json', 'utf-8'));
// const InputDataDecoder = require('ethereum-input-data-decoder');

const web3 = new Web3 (new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/49ec18cc3e22418f9c8901d695d68f44'));

var fromAddress = "0xDc0ba17b3FD674F8372df48B84CB6b75f5451C0B";
var toAddress = "0x7A03C24D58A19D27A66dBa7769573A0E7FDF3989";

var count = web3.eth.getTransactionCount(fromAddress);
// var abiArray = JSON.parse(fs.readFileSync('coin.json', 'utf-8'));

var contractAddress = "0xf52a47a51260636102c6caed04fdb909b46768b3";
var contract = new web3.eth.Contract(abiArray,contractAddress);

// var Transaction = web3.eth.rawTransaction;

web3.eth.getTransactionCount(fromAddress, (error, count) => {
var rawTransaction = {
    "from": fromAddress,
    "nonce": Web3Utils.toHex(count),
    "gasPrice": Web3Utils.toHex(Web3Utils.toWei('5', 'gwei')),
    "gasLimit": Web3Utils.toHex(42000),
    "to": contractAddress,
    "value": 0x0,
    "data": contract.methods.transfer(toAddress, Web3Utils.toWei('10', 'ether')).encodeABI(),
    "chainId": "0x03"
}

// var fixedGasPrice = 0.000000005;
// var fixedGasLimit = 42000;
// predictedCost = fixedGasLimit * fixedGasPrice;
// console.log(predictedCost);


// web3.eth.getGasPrice().then((result) => {
//     console.log(web3.utils.fromWei(result, 'ether')
//     )
//   });
// web3.eth.getGasPrice(function(error, result){ 
// var gasPrice = Number(result);


// var gasPrice = 5;
// console.log(gasPrice + " Gwei");

// // console.log("Gas Price is " + gasPrice);

// var gasLimit = 42000;
// console.log(gasLimit);

// // web3.eth.getBlock("latest", false, (error, result) => {
// //     console.log("GasLimit: " + result.gasLimit)

// var total = gasLimit * gasPrice
// console.log("total gas = " + total);


 
 

 

var privKey = new Buffer('F1B231303267FCFD236E279BA712CD457E5D917871FD25A414107618BFAD8120', 'hex');
var tx = new Tx(rawTransaction);

tx.sign(privKey);
var serializedTx = tx.serialize();

web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, txHash) {
    if (!err)
        console.log(txHash);
    else
		console.log(err);
    }
);
});		
		
const decoder = new InputDataDecoder(coursesContract.abi);

// console.log(decoder)

const data = `0xa9059cbb000000000000000000000000b5e77a7f21f5a063d35731535b4d538a25747c4900000000000000000000000000000000000000000000152d02c7e14af6800000`;
const result = decoder.decodeData(data);

// console.log(result);


web3.eth.getTransaction(txHash, (error, txResult) => {
const result = decoder.decodeData(txResult.input);
console.log('0x' + result.inputs[0].toString(result))

})

web3.eth.getBalance(txHash, (error, txResult) => {
const result = decoder.decodeData(txResult.input);
console.log(result.inputs[0].toString(result))
	
})
