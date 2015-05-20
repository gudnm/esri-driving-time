var dtime = require("./index.js");
//269 Varick St, Jersey City NJ 07302
dtime.getDrivingTime("neasdfsdf", 
	"63 New Hook Rd, Bayonne NJ 07002", function(from, to) {
		console.log(from, to);
	});