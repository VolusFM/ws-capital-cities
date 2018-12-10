// source : https://leafletjs.com/examples/quick-start/
var map;

function initialiseMap(id) {
	map = L.map(id);
	map.setView([37.7504, -122.4425], 13);
	var basemap = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
	        attribution: '<a href="http://content.stamen.com/dotspotting_toner_cartography_available_for_download">Stamen Toner</a>, <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	        maxZoom: 17
	});
	basemap.addTo(map);
}

function setViewMap(long, lat) {
	map.setView([long, lat], 12);
}