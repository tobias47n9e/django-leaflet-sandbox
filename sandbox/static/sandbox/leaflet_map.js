function main_map_init (map, options) {
    map.setView([55.0, 9.0], 10);

    marker = L.marker([55.0, 9.0]).addTo(map);
    marker.bindPopup("<b>POI 1</b><br>This is POI 1.");

    var polyline = L.polyline([[55.1, 9.1],[49.9, 8.9]], {color: 'red'}).addTo(map);

    var popup_layer = L.layerGroup([marker]);

    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>';
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';

    var osm = L.tileLayer(mbUrl, {id: 'mapbox.osm', attribution: mbAttr})
    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr});
    var streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr});

    var baseMaps = {"Grayscale": grayscale,
                    "OpenStreetMap": osm,
                    "Streets": streets, };
    var overlayMaps = {"Points of Interest": popup_layer,
                       "Hydro": hydro, };
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    function on_map_clicked(event) {
        event_marker = L.marker(event.latlng).addTo(map);
        event_marker.bindPopup("<b>You clicked on the map at:</b><br>" +
                            Math.round(event.latlng.lat * 100) / 100 +
                            "° " +
                            Math.round(event.latlng.lng * 100) / 100 +
                            "°" +
                            "<br><b>The altitude is:</b><br>" +
                            event.altitude);
        event_marker.openPopup();
        event_marker.on("popupclose",
        function (event) {map.removeLayer(event_marker);})
    }
    map.on('click', on_map_clicked);

    function on_base_changed(event) {
        console.log("Base layer changed");
    }
    map.on("baselayerchange", on_base_changed);

    var dataurl = '{% url "data" %}';

    $(document).ready(function() {
        console.log("document ready")
    });
}
