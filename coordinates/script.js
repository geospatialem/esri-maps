//Globals
var map, latitude, longitude;

require([
  "esri/map",
  "esri/layers/ArcGISTiledMapServiceLayer",
  "esri/geometry/webMercatorUtils",
  "dojo",
  "dojo/domReady!"
 ],

function (
  map,
  tileServiceLayer
){

  map = new map ("map", {
    center: [-93.5, 46.5],
    zoom: 6,
    attributionWidth: 0.15,
    logo: false
  });

  /* Add Aerial Reference Tile Services */
  //TODO: Move this outside the Esri JS Loop BS
  var aerialReference = new tileServiceLayer("//services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
  var aerial = new tileServiceLayer("//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
  map.addLayers([aerial, aerialReference]);


  map.on("load", function() {
    map.on("click", showCoordinates);
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
