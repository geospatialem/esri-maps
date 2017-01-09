//Globals
var map, latitude, longitude;

require([
  "esri/map",
  "esri/layers/ArcGISTiledMapServiceLayer",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/graphic",
  "esri/geometry/webMercatorUtils",
  "dojo",
  "dojo/domReady!"
 ],

function (
  map
){

  map = map ("map", {
    center: [-93.5, 46.5],
    zoom: 6,
    attributionWidth: 0.15,
    logo: false
  });

  /* Add Aerial Reference Tile Services */
  var aerialReference = esri.layers.ArcGISTiledMapServiceLayer("//services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
  var aerial = esri.layers.ArcGISTiledMapServiceLayer("//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
  map.addLayers([aerial, aerialReference]);

  //TODO: Move this outside the Esri JS Loop BS
  var latLngGraphic = esri.symbol.SimpleMarkerSymbol({
    "size": 10,
    "type": "esriSMS",
    "style": "esriSMSX",
    "outline": {
      "color": [255,0,0,255],
      "width": 4
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
