var map = new ol.Map({
  target: "map2",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-89.6444, 21.0482]),
    zoom: 20
  })
});

map.on("click", function(e) { 
    
    var coords = ol.proj.toLonLat(e.coordinate);
  
    document.getElementById('mouse-position').value = coords;
});