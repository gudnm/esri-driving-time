var https = require("https");
var Geoservices = require("geoservices");
var edump = require("esri-dump");

var url = "http://route.arcgis.com/arcgis/rest/services/World/
Route/NAServer/Route_World/solve?token=#{esri_token}&stops=
#{endpoints.join(';')}&f=json";

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

var getDrivingTime = function(from, to, callback) {
	var geoJson = edump()
};

module.exports.getDrivingTime = getDrivingTime;