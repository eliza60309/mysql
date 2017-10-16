const Web3 = require('web3');

/*
* connect to ethereum node
*/
const ethereumUri = 'http://localhost:8540';

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));

if(!web3.isConnected()){
throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}else{
console.log('connected to ehterum node at ' + ethereumUri);
let coinbase = web3.eth.coinbase;
console.log('coinbase:' + coinbase);
let balance = web3.eth.getBalance(coinbase);
console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
let accounts = web3.eth.accounts;
console.log(accounts);
}
