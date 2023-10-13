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