var map;
	require(["esri/map", "dojo/domReady!"], function(Map) {
		map = new Map("map", {
			basemap: "osm",
			center: [-122.45, 37.75], // longitude, latitude
			zoom: 13
        });
	});
