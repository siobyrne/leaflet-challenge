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