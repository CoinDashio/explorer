var eth = require('../web3relay').eth;

var pluAbi = require('./abis/plu.json');

module.exports = function(req, res) {
	var addr = req.params.addr;
	var token = req.params.token;

	console.log(addr);
	console.log(token);

	var abi = abiForToken(token);
	if (abi) {
		var contractAddress = addressForToken(token);
		if (contractAddress) {
			var contract = eth.contract(abi).at(contractAddress);	
			res.write(JSON.stringify({"balance": contract.balanceOf(addr)}));
		    res.end();
		}
		else {
		  sendError(res, "token unrecognized");
		}
	}
	else {
	  sendError(res, "token unrecognized");
	}
}

var abiForToken = function(token) {
	if (token === "plu") {
		return pluAbi;
	}

	return null;
}

var addressForToken = function(token) {
	if (token === "plu") {
		return "0xD8912C10681D8B21Fd3742244f44658dBA12264E";
	}

	return null;
}

var sendError = function(res, message) {
	res.write(JSON.stringify({"error": message}));
    res.end();
}