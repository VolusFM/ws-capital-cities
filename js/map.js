// source : https://leafletjs.com/examples/quick-start/
var map;

function initialiseMap(id) {
	map = L.map(id);
	map.setView([20, 0], 2);
	var basemap = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
	        attribution: '<a href="http://content.stamen.com/dotspotting_toner_cartography_available_for_download">Stamen Toner</a>, <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	        maxZoom: 17
	});
	basemap.addTo(map);
}

function setViewMap(longDeg, longMin, longDir, latDeg, latMin, latDir) {
	var zoom = 10;
	var coordonnes = degresMinutesToDecimal(longDeg, longMin, longDir, latDeg, latMin, latDir);
	map.setView(coordonnes, zoom);
}

function addMarqeur(nom, url, longDeg, longMin, longDir, latDeg, latMin, latDir) {
	var coordonnes = degresMinutesToDecimal(longDeg, longMin, longDir, latDeg, latMin, latDir);
	var marker = L.marker(coordonnes).addTo(map);
	marker.bindPopup('<a href="'+url+'">'+nom+'</a>').openPopup();
}

function degresMinutesToDecimal(longDeg, longMin, longDir, latDeg, latMin, latDir) {
	var long = parseInt(longDeg, 10) + parseInt(longMin, 10)/60;
	var lat = parseInt(latDeg, 10) + parseInt(latMin, 10)/60;
	if(longDir == 'W') long *= -1;
	if(latDir == 'S') lat *= -1;
	return [lat, long];
}