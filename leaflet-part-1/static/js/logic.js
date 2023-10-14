// store API endpoint

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// get data from url for features

d3.json(url).then(function (data) {
    createFeatures(data.features);
});

// set marker size, mag = magnitude (strength of earthquake)
function markerSize(mag){
    return mag * 2500;
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
}