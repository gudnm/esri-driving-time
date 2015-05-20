var https = require("https");
var Geoservices = require("geoservices");
var edump = require("esri-dump");
var request = require("request");

var geoCodeFromAndTo = function(from, to, callback) {
	var client = new Geoservices(),
		origin = {}, dest = {};

	client.geocode({text: from}, function(error, result) {
		if (error) {
			console.error("Error in from: " + error);
		} else {
			origin.x = result.locations[0].feature.geometry.x;
			origin.y = result.locations[0].feature.geometry.y;

			client.geocode({text: to}, function(error, result) {
				if (error) {
					console.error("Error in to: " + error);
				} else {
					dest.x = result.locations[0].feature.geometry.x;
					dest.y = result.locations[0].feature.geometry.y;

					callback(origin, dest);
				}
			})
		}
	});

};

var getDrivingTime = function(eId, eSecret, from, to, callback) {
	var token,
		restUrl = "http://route.arcgis.com/arcgis/rest/",
		routePath = "services/World/Route/NAServer/Route_World/";
	
	request.post(
		'https://www.arcgis.com/sharing/rest/oauth2/token',
		{form: {
			f: 'json',
			client_id: eId,
			client_secret: eSecret,
			grant_type: 'client_credentials'
		}},
		function(error, res, body) {
			if (error) {
				console.log(error);
			} else if (res.statusCode == 200) {
				token = JSON.parse(body).access_token;
				console.log(token);

				
				var routeParams = "solve?token=" + token + 
					"&stops=" +  + "&f=json";
				//var geoJson = edump(restUrl + routePath + routeParams);
			}
		}
	);


};

module.exports.getDrivingTime = getDrivingTime;