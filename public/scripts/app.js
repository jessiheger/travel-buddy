console.log("Sanity Check: JS is working!");
mapboxgl.accessToken='pk.eyJ1IjoiamVzc2loZWdlciIsImEiOiJjamh3ZGNhNG8wNjNmM3JvYnA3ZmtvNTAwIn0.jauifVcTS4_CQcsP9uBiyw';

$(document).ready(function() {
  $('#createPost').on('submit', function(e) {
    e.preventDefault();
    let newCity = $('#cityCreate').val().toLowerCase();
    $.ajax({
      method:   'POST'
      ,url:     '/create'
      ,data:    $(this).serialize()
      ,success: onSuccess
      ,error:   onError
    }).done(function(data) {
      window.location = `/${newCity}`
    });
  });
});

/* Map: This represents the map on the page. */
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  zoom:1.5,
  center: [-24.712,29.063]
});

map.on("load", function () {
  /* Image: An image is loaded and added to the map. */
  map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
      if (error) throw error;
      map.addImage("custom-marker", image);
     /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
      map.addLayer({
        id: "markers",
        type: "symbol",
        /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features:[
              {"type":"Feature",
              "geometry":{
                "type":"Point",
                "coordinates":["-21.8174","64.1265"]
              }},
              {"type":"Feature",
              "geometry":{
                "type":"Point",
                "coordinates":["55.2708","25.2048"]
              }},
              {"type":"Feature",
              "geometry":{
                "type":"Point",
                "coordinates":["-122.3321","47.6062"]
              }},
              ]}
          },
        layout: {
          "icon-image": "custom-marker",
        }
      });
    });
});

$('#citySearch').on('submit', function(e) {
  e.preventDefault();
  let newCity = $('#cityInput').val().toLowerCase();
  window.location = `/${newCity}`
});

function onError(e) {
  console.log('POST fail\n', e);
}

function onSuccess(json) {
  console.log('POST success\n', json);
}