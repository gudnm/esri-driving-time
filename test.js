var dtime = require("./index.js");

var esriCliendId = 'o7U4CF9NDgDtVryb',
	esriClientSecret = 'f331ecdd0fe74a7a996ec514319578dc';

dtime.getDrivingTime(esriCliendId, esriClientSecret,
	"long valley, nj",
	"269 Varick St, Jersey City NJ 07302", function(result) {
		console.log(result);
	});