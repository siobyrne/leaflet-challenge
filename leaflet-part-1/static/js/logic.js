// store API endpoint

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// get data from url for features

d3.json(url).then(function (data) {
    createFeatures(data.features);
});

// set marker size, mag = magnitude (strength of earthquake)
function markerSize(mag){
    return mag * 40000;
};

// set color scale based on depth of quake
function markerColor(depth) {
    if (depth < 10) return "rgb(156, 223, 124)";
    else if ( depth < 30) return "rgb(74, 189, 140)";
    else if ( depth < 50) return "rgb(0, 150, 142)";
    else if ( depth < 70) return "rgb(16, 110, 124)";
    else if ( depth < 90) return "rgb(42, 72, 88)";
    else return "rgb(250, 250, 110)";
};

function createFeatures(quakedata){

    // create a function that gets each feature and creates a popup of time/place of earthquake
    function eachFeature(feature, layer){
        layer.bindPopup(`<h3>Place: ${feature.properties.place}</h3><hr><p>Time: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }

    // create geoJSON layer and run  eachFeature

    let quakes = L.geoJSON(quakedata, {
        onEachFeature: eachFeature,

        // tell layer to use bubble marker via pointToLayer
        pointToLayer: function(feature, location){

            var markers = {
                radius: markerSize(feature.properties.mag),
            fillColor: markerColor(feature.geometry.coordinates[2]),
            color: "black",
            stroke: true,
            fillOpacity: 0.75,
            weight: 1
            }
            return L.circle(location, markers)
        }
    });

    // send layer to map
    createMap(quakes);
}

function createMap(quakes){

    // create base layers
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    let topography = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // create baseMaps
    let baseMaps = {
        "Street Map": street,
        "Topographic Map": topography
      };

      // create overlay
      let overlayMaps = {
        "Earthquakes in the last 7 days": quakes
      };

      // create map and show layers
      let myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [street, quakes]
      });

      // layer control
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

      // add legend
      var legend = L.control({position: 'bottomright'});
      legend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div', 'info legend'),
        depth = [-10, 10, 30, 50, 60, 90];
        

        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
            
              '<i style="background:' + markerColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
          }
          return div;
        };

        legend.addTo(myMap);

}