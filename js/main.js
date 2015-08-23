var map;
	require([
	         "esri/map", 
	         "esri/dijit/HomeButton",
	         "dojo/domReady!"
   ], 	
   
function (Map, HomeButton) {
	
	var map = new Map("map", {
			basemap: "topo",
			center: [-93.5, 46.5],
			zoom: 6
	});
	
	var home = new HomeButton ({ //Home Button
	    map: map
	}, "HomeButton");
	
	//Startup
	home.startup();

});