var eth = require('../web3relay').eth;

var pluAbi = require('./abis/plu.json');
var testcrowdsaleAbi = require('./abis/testcrowdsale.json');


var etherUnits = require(__lib + "etherUnits.js")

module.exports = function(req, res) {
	var addr = req.params.addr;
	var token = req.params.token;

	var abi = abiForToken(token);
	if (abi) {
		var contractAddress = addressForToken(token);
		if (contractAddress) {
			var contract = eth.contract(abi).at(contractAddress);	
			res.write(JSON.stringify({"balance": etherUnits.toEther(contract.balanceOf(addr), 'wei')}));
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

	if (token === "testcrowdsale") {
		return testcrowdsaleAbi;
	}

	return null;
}

var addressForToken = function(token) {
	if (token === "plu") {
		return "0xD8912C10681D8B21Fd3742244f44658dBA12264E";
	}

	if (token === "testcrowdsale") {
		return "0xc6a37f61bec932e299320b1e656df72016b62637";
	}

	return null;
}

var sendError = function(res, message) {
	res.write(JSON.stringify({"error": message}));
    res.end();
}
