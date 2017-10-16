var mysql = require('mysql');
var readline = require('readline');
var Web3 = require('web3');
//var Personal = require('web3-eth-personal');
//var solc = require('solc');


var results = [];
function callback(...para)
{
	results = para;
}



var provider = new Web3.providers.HttpProvider('http://10.0.2.15:4000');
var web3 = new Web3(provider);

if(web3.eth.net.isListening())
{
	console.log("Connected to chain");
}




var con = mysql.createConnection
(
	{
		host: 'localhost',
		user: 'account0',
		database: 'newdb'
	}
)


var iface = readline.createInterface
(
	{
		input: process.stdin,
		output: process.stdout
	}
)

var flag = false;

con.connect
(
	function(err)
	{
		if(err)throw err;
		console.log("DB connected");
	}
)

//console.log('Specify your account');
var account = "";
var desc = "";
console.log('Enter your account:');
iface.on
(
	'line', 
	(input) =>
	{
		if(!flag)
		{
			if(input.length == 42 || true)
			{
				console.log('Valid account');
				console.log('Describe the transaction:');
				account = input;
				flag = !flag;
			}
			else
			{
				console.log('Error account');
			}
		}
		else
		{
			if(input.length <= 200 && input.length > 0 || true)
			{
				console.log('Transaction recorded');
				console.log('Enter your account:');
				desc = input;
				var para = 'set @a := \"' + account + '\";';
				console.log(para);
				var sql = 'select * from account where account = @a;';
				con.query
				(
					para,
					function (err, result, field)
					{
						if(err)throw err;
					}
				);
				con.query
				(
					sql,
					function (err, result, field)
					{
						if(err)throw err;
						console.log(result);	
					}
				);
				//result = results[1];
				flag = !flag;
			}
			else
			{
				console.log('Error transaction');
			}
			flag = !flag;
		}
	}
)

