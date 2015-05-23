var Geoservices = require("geoservices");
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

				geoCodeFromAndTo(from, to, function(origin, dest) {

					var routeParams = "solve?token=" + token + 
						"&stops=" + origin.x + "," + origin.y + 
						";" + dest.x + "," + dest.y + "&f=json";
					var url = restUrl + routePath + routeParams;

					request.get(url, function(error, res, body) {
						if (error) {
							console.log(error) 
						} else if (res.statusCode == 200) {
							var json = JSON.parse(body);
							var attrs = json.routes.features[0].attributes;
							callback(attrs.Total_TravelTime);							
						}
					});
				});
			}
		}
	);
};

module.exports.getDrivingTime = getDrivingTime;