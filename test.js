var dtime = require("./index.js");

var esriCliendId = 'o7U4CF9NDgDtVryb',
	esriClientSecret = 'f331ecdd0fe74a7a996ec514319578dc';

dtime.getDrivingTime(esriCliendId, esriClientSecret,
	"269 Varick St, Jersey City NJ 07302", 
	"63 New Hook Rd, Bayonne NJ 07002", function(result) {
		console.log(result);
	});