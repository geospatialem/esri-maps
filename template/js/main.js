var map;
	require([
	         "esri/map", 
	         "esri/dijit/Search",
	         "esri/dijit/HomeButton",
	         "dojo/domReady!"
   ], 	
   
function (mapDiv, searchBox, homeBtn) {
	
	var mappy = new mapDiv ("map", {
			basemap: "topo",
			center: [-93.5, 46.5],
			zoom: 6
	});
	
	/* Home button */
	var homeButton = new homeBtn ({
	    map: mappy
	}, "HomeButton");
	
	/* Search dialog box */
	var searchDialog = new searchBox ({
        enableButtonMode: true, //Display as a button on load
		map: mappy
     }, "search");
	
	/* On startup */
	homeButton.startup();
	searchDialog.startup();

});