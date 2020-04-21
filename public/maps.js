var map = new ol.Map({
  target: "map",
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

var vectorSource = new ol.source.Vector({
  features: []
});
var vectorLayer = new ol.layer.Vector({
  source: vectorSource
});

var iconstyle = new ol.style.Style({
  image: new ol.style.Icon(
    /** @type {olx.style.IconOptions} */ ({
      scale: 0.1,
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      opacity: 1,
      src: "https://png.pngtree.com/svg/20161019/e07267118b.png"
    })
  )
});

function loadMapCrop(entry) {
  var coords = entry.location.split(',')
  var name = '"'+entry.name+'"' + ' ('+entry.type+')'+'\n'+
             'Sembrado: '+ formatDate(new Date(entry.seedDate)) +'\n'

  //console.log(name)
  
  var newPin = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([coords[0],coords[1]])),
    name: name,
  });
  newPin.setStyle(iconstyle);
  vectorSource.addFeature(newPin);
}

socket.on("LoadMapCrops", function(data) {
  if (!data) return;

  data.forEach(function(entry) {
    loadMapCrop(entry);
  });

  map.addLayer(vectorLayer);

  var element = document.getElementById("popup");

  var popup = new ol.Overlay({
    element: element,
    positioning: "bottom-center",
    stopEvent: false,
    offset: [0, -50]
  });
  map.addOverlay(popup);

  // display popup on click
  map.on("click", function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
      return feature;
    });
    if (feature) {
      var coordinates = feature.getGeometry().getCoordinates();
      popup.setPosition(coordinates);
      
      $(element).popover({
        placement: "top",
        html: true,
        content: feature.get("name")
      });
      
      $(element).popover("show");
      
      $('.popover-content').html(feature.get("name"))
    } else {
      $(element).popover("destroy");
    }
  });
  
});
