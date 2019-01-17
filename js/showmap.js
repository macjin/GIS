
window.onload = function() {
var map = L.map('map', {
    zoom: 4,
    attributionControl: false,
    center: L.latLng([59, 18]),
    fullscreenControl: {
      pseudoFullscreen: false
    },
  }),
  osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

map.addLayer(osmLayer);

function iconByName(name) {
  return '<i class="icon icon-' + name + '"></i>';
}

function featureToMarker(feature, latlng) {
  return L.marker(latlng, {
    icon: L.divIcon({
      className: 'marker-' + feature.properties.amenity,
      iconUrl: '../images/markers/' + feature.properties.amenity + '.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  });
}

var baseLayers = [{
  name: "Road Terrain",
  layer: osmLayer
}];

var roadStyle = {
  "color": "#1d88e0",
  "weight": 1,
  "opacity": 1
};

var overLayers = [{
    name: "Muncipality Boundary",
    icon: iconByName('waterBody'),
    layer: L.geoJson(jsonMuncipality, {
      pointToLayer: featureToMarker,
      color: '#66d9ff',
      fillColor: '#0044FF',
      weight: 1,
      opacity: 1,
      fillOpacity: .51
    })
  },

  {
    name: "Population Density",
    icon: iconByName('pestInfestation'),
    layer: L.geoJson(jsonPopulationDensity, {
      pointToLayer: featureToMarker,
      style: function(feature) {
        var fillColor,
          HWC_RISK = feature.properties.HWC_RISK;
        if (HWC_RISK == "3") fillColor = "#FF9999";
        else if (HWC_RISK == "2") fillColor = "#FFFCAC";
        else if (HWC_RISK == "1") fillColor = "#B8F1CC";
        else fillColor = "#FF9999"; // no data
        return {
          color: "#999",
          weight: 2,
          fillColor: fillColor,
          fillOpacity: .6
        };
      }
    })
  },
  {

    name: "Rail Way Centres",
    icon: iconByName('fire'),
    layer: L.geoJson(jsonRailways, {
      pointToLayer: featureToMarker
    })
  }
];

var panelLayers = new L.Control.PanelLayers(baseLayers, overLayers);

map.addControl(panelLayers);

var feature_group = new L.featureGroup([]);
var raster_group = new L.LayerGroup([]);
var layerOrder = new Array();

L.control.layers({}, {

}, {
  collapsed: false
}).addTo(map);
L.control.scale({
  options: {
    position: 't',
    maxWidth: 100,
    metric: true,
    imperial: false,
    updateWhenIdle: false
  }
}).addTo(map);
}
