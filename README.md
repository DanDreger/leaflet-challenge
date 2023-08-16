# leaflet-challenge

Leaflet visualization of earthquakes using United States Geological Survey (USGS) data

![Screenshot 2023-08-16 at 3 00 54 PM](https://github.com/DanDreger/leaflet-challenge/assets/23018536/9ca50691-886f-4b1b-b3a7-6671371d9416)

By gathering data from USGS and Github, this code visualizes the earthquakes in the past week, and displays them on the same map as the tectonic plates. 

## Datasets
* USGS Earthquake Data Feed : https://earthquake.usgs.gov/earthquakes/feed/
* https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json

## Tech Stack

* Leaflet.js
* D3
* Javascript
* CSS
* HTML

Requirements:

* Using Leaflet, create a map that plots all the earthquakes from the past 7 days based on their longitude and latitude.
* Data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
* Popups should provide additional information about the earthquake when its associated marker is clicked.
* Create a legend that will provide context for your map data.
