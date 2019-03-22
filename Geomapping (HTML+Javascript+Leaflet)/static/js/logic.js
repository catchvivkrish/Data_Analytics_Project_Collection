// Store our API endpoints inside respective URL's
var earthquakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
var tectonicplates_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// create function to determine the marker size for each earthquake based on its magnitude
function markerSize(magnitude) {
    return magnitude * 4;
};

// create function to return a different color for each earthquake based on its magnitude
function Color(magnitude) {
  console.log(magnitude)
  if (magnitude > 5) {
      return 'red'
  } else if (magnitude > 4.0) {
      return 'darkorange'
  } else if (magnitude > 3.0) {
      return 'tan'
  } else if (magnitude > 2.0) {
      return 'yellow'
  } else if (magnitude > 1.0) {
      return 'darkgreen'
  } else {
      return 'lightgreen'
  }
};

// create a new layer group for earthquake data
var earthquake_data = new L.LayerGroup()

// create a geoJSON element for the earthquake data
d3.json(earthquakes_url, function(data) {
  L.geoJSON(data.features, {
      pointToLayer: function(geoJsonPoint, latlng) {
        return L.circleMarker(latlng,{radius:markerSize(geoJsonPoint.properties.mag)})
      },
      style: function (feature) {
          return {
            fillOpacity: 0.7,
            weight: 0.1,
            color: 'red',
            fillColor: Color(feature.properties.mag)
          }
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
          "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>")
      }
  }).addTo(earthquake_data)
})

// create a new layer group for tectonic plate data
var tectonicplates_data = new L.LayerGroup()

// create a geoJSON element for the tectonic plate data
d3.json(tectonicplates_url, function (geoJson) {
    L.geoJSON(geoJson.features, {
        style: function (geoJsonFeature) {
            return {
                weight: 2,
                color: 'magenta'
            }
        },
    }).addTo(tectonicplates_data);
})

// define the createMap function
function createMap() {

    // define different base layers

    var highContrastMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.high-contrast',
        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'
    });

    var streetMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'
    });

    var darkMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'
    });

    var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'
    });

    // List of Base layers to be displayed in the control layer
    var baseLayers = {
        "High Contrast": highContrastMap,
        "Street": streetMap,
        "Dark": darkMap,
        "Satellite": satellite
    };

    // List of overlay layers to be displayed in the control layer
    var overlays = {
        "Earthquakes": earthquake_data,
        "Tectonic Plate Boundaries": tectonicplates_data,
    };

    // define base map view and initial zoom level along with default base and overlay layer
    var mymap = L.map('map', {
        center: [37.09, -95.71],
        zoom: 2,
        layers: [streetMap, earthquake_data, tectonicplates_data]
    });

    // add the control layer to the map
    L.control.layers(baseLayers, overlays, {
      collapsed: false
    }).addTo(mymap)

    // create the legend for the earthquake data
    var legend = L.control({ position: 'bottomleft' })
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
      magnitude = [0, 1, 2, 3, 4, 5],
      labels = []
      div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"
      for (var i = 0; i < magnitude.length; i++) {
          div.innerHTML +=
          '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +
          magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+')
      }
      return div
    }
    legend.addTo(mymap)
}

// run the create map function
createMap()