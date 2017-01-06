//Globals
var map;

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
  var aerialReference = new tileServiceLayer("//services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
  var aerial = new tileServiceLayer("//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
  map.addLayers([aerial, aerialReference]);


  //TODO: Grab lat, lng from x,y
  //Resource: https://developers.arcgis.com/javascript/3/sandbox/sandbox.html?sample=map_xycoords
  map.on("load", function() {
    map.on("mouse-move", showCoordinates);
    map.on("click", showCoordinates);
  });


});
function showCoordinates(event) {
  var latLng = esri.geometry.webMercatorToGeographic(event.mapPoint);
  dojo.byId("info").innerHTML = latLng.x.toFixed(3) + ", " + latLng.y.toFixed(3);
}
