
function getColor(depth) {
    return depth > 50 ? 'red' :
        depth > 30 ? 'yellow' :
            'green';
}

function getRadius(magnitude) {
    return magnitude * 4; // you can adjust the multiplier to get the size you like
}

function createLegend(map) {
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'info legend'),
            depths = [0, 30, 50],
            labels = ["<h4 class='depth-legend'>Earthquake Depths (in KM)</h4>",],
            from, to;

        for (let i = 0; i < depths.length; i++) {
            from = depths[i];
            to = depths[i + 1];

            labels.push(
                '<i style="background:' + getColor(from + 1) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        div.innerHTML = labels.join('<br>');
        return div;
    };

    legend.addTo(map);
}

function createMap(quakes) {

    // Create the tile layer that will be the background of our map.
    let pacific = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });


    // Create a baseMaps object to hold the pacific layer.
    let baseMaps = {
        "Pacific Ocean": pacific
    };

    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
        "Earthquakes": quakes
    };

    // Create the map object with options.
    let map = L.map("map", {
        center: [0, 0],
        zoom: 2,
        layers: [pacific, quakes]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    createLegend(map);
}

function createMarkers(response) {

    // Pull the "stations" property from response.data.
    let earthquakes = response.features

    // Initialize an array to hold bike markers.
    let quakes = [];

    // Loop through the stations array.
    for (let index = 0; index < earthquakes.length; index++) {
        // let station = stations[index];
        let feature = earthquakes[index];

        // For each quake, create a marker, and bind a popup with the quake's info.
        let quakeMarker = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            color: getColor(feature.geometry.coordinates[2]),
            radius: getRadius(feature.properties.mag),
            weight: 1,
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            weight: 1 // Border weight
        }).bindPopup("<h3>" + feature.properties.title + "<h3><h4>Magnitude: " + feature.properties.mag + "</h4>" + "<h4>Depth: " + feature.geometry.coordinates[2] + "</h4>");

        // Add the marker to the bikeMarkers array.
        quakes.push(quakeMarker);
    }

    // Create a layer group that's made from the markers array, and pass it to the createMap function.
    createMap(L.layerGroup(quakes));
}

// Perform an API call to the USGS API to get the information. Call createMarkers when it completes.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson").then(createMarkers);