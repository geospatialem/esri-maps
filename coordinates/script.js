//Globals
var map, latitude, longitude;

require([
  "esri/map",
  "esri/dijit/Search",
  "esri/layers/ArcGISTiledMapServiceLayer",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/graphic",
  "esri/geometry/webMercatorUtils",
  "dojo",
  "dojo/domReady!"
 ],

function (
  mapDiv
){

  /* Map */
  map = mapDiv ("map", {
    center: [-93.5, 46.5],
    zoom: 6,
    attributionWidth: 0.15,
    logo: false
  });

  /* Search */
   var search = esri.dijit.Search({
     map: map,
     enableButtonMode: "true",
     expanded: "true"
   }, "search");
   search.startup();


  /* Add Aerial Reference Tile Services */
  var aerialReference = esri.layers.ArcGISTiledMapServiceLayer("//services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
  var aerial = esri.layers.ArcGISTiledMapServiceLayer("//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
  map.addLayers([aerial, aerialReference]);

  //TODO: Move this outside the Esri JS Loop BS
  var latLngGraphic = esri.symbol.SimpleMarkerSymbol({
    "color": [255,0,0,100],
    "size": 8,
    "type": "esriSMS",
    "style": "esriSMSCircle",
    "outline": {
      "color": [255,0,0,255],
      "width": 1
    }
  });

  map.on("load", function() {
    map.on("click", showCoordinates);
    //TODO: Move this outside the Esri JS Loop BS
    map.on("click", function(mapClick) {
      map.graphics.clear();
      map.graphics.add(esri.Graphic(mapClick.mapPoint, latLngGraphic));
    })
  });

});

function showCoordinates(event) {
  var latLng = esri.geometry.webMercatorToGeographic(event.mapPoint);
  latitude = latLng.y.toFixed(4);
  longitude = latLng.x.toFixed(4);
  dojo.byId("info").innerHTML = "Latitude: " + latLng.y.toFixed(4) + "<br />Longitude: " + latLng.x.toFixed(4);
}

//TODO: Clean this up
function openEmailWithCoordinates () {
  window.location="mailto:?subject=Lat/Lng&body=Latitude: " + latitude + " Longitude: " + longitude;
}
