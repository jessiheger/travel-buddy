console.log("Sanity Check: JS is working!");
// import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken='pk.eyJ1IjoiamVzc2loZWdlciIsImEiOiJjamh3ZGNhNG8wNjNmM3JvYnA3ZmtvNTAwIn0.jauifVcTS4_CQcsP9uBiyw';

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
  let data = {city: newCity};
  console.log("newCity is", newCity);
  $.ajax({
    method: 'GET',
    url: `/${newCity}`,
    data: data
  }).done(function(data) {
    window.location = `/${newCity}`
  });
});


// $(document).ready(function() {
//   $searchItems = $('#searchResults');
//   $nutrientResults = $('#nutrientResults');
//   // $listResults = $('#foodList');

// //////////// return nutrient information ///////////
//   $('#searchForm').on('submit', function(e) {
//     e.preventDefault();
//     $nutrientResults.empty();
//     // searchAuto = true;
//     $.ajax({
//     method:   'POST'
//     ,url:     '/search/nutrients'
//     ,data:    $(this).serialize()
//     ,success: onSuccess
//     ,error:   onError
//   });
//     $searchItems.empty();
//     $('#searchInput').val('');
//   });

// //// search nutrients with specified quantity ////
//   $("#submitModalForm").on("click", function(e) {
//     e.preventDefault();
//     if (modalInput) {
//       $('#searchInput').val(modalInput + ' ' + foodToSearch);
//       $('#searchForm').submit();
//     $('#foodQuantity').val('');
//     }
//   });

// //////////// store food in user's db ////////////
//   $(document).on("click", "#saveItem", function(e) {
//     $nutrientResults.empty();
//     // searchAuto = true;
//     $.ajax({
//       method:   'POST'
//       ,url:     '/search/item'
//       ,data:    nutrientsInItem
//       ,success: nutrientPostSuccess
//       ,error:   nutrientPostError
//     });
//   });

// //////////// populate autocomplete list ///////////
//   $(document).on("click", ".quickSearch", function(e) {
//     // searchAuto = false;
//     $searchItems.empty();
//     $("#foodNameHTML").text(this.dataset.name);
//     foodToSearch = this.dataset.name;
//   });

// //////////////// delete food from db ////////////////
//   $(document).on("click", ".deleteFood", function(e) {
//     $.ajax({
//       method:   'DELETE'
//       ,url:     `/search/item/${this.dataset.id}`
//       ,success: deleteSuccess
//       ,error:   deleteError
//     }).then(() => {
//       $(this).parent().parent().parent().remove();
//     })
//   });

// ////////////// remove food from list ///////////////
//   $(document).on("click", ".removeItem", function(e) {
//     $(this).parent().parent().parent().remove();
//   });

// ///////////////// update profile /////////////////
//   $("#updateProfile").on("submit", function(e) {
//     e.preventDefault();
//     $.ajax({
//       method:   'PUT'
//       ,url:     '/profile/edit'
//       ,data:    $(this).serialize()
//       ,success: updateSuccess
//       ,error:   updateError
//     })
//   });
// });

// /////////////// render food list /////////////////
//   // $.ajax({
//   //   method:   'GET'
//   //   ,url:     '/profile/api'
//   //   ,success: listSuccess
//   //   ,error:   listError
//   // })

// $('#foodInfo').on('shown.bs.modal', function() {
//   $('#foodQuantity').focus();
// });

// $('#foodInfo').on('hidden.bs.modal', function() {
//   $('#searchInput').focus();
// });

// ///////////////////////////////////////////////////////////
// ////////////////////// AUTOCOMPLETE ///////////////////////
// ///////////////////////////////////////////////////////////

// function ejaxPost(text) {
//   // if (text !== '' && searchAuto) {
//   if (text !== '') {
//     $.ajax({
//       method:   'POST'
//       ,url:     '/search'
//       ,data:    {text}
//       ,success: handleSuccess
//       ,error:   handleError
//     });
//   } else {
//     allSearches = [];
//     $searchItems.empty();
//   }
// }

// function searchChange(input) {
//   // searchAuto = true;
//   if (input.length > 2) { ejaxPost(input); }
//   if (input.length == 0) { $searchItems.empty(); }
// }

// function quantityChange(input) {
//   return modalInput = input;
// }

// function handleError(e) {
//   console.log('POST fail', e);
// //   //$('#todoTarget').text('Failed to load todos, is the server working?');
// }

// function handleSuccess(json) {
//   allSearches = json;
//   render();
// }

// function render() {
//   $searchItems.empty();
//   if (allSearches == "empty search") { return console.log(allSearches); }
//   let searchHtml = getAllSearchHtml(allSearches);
//   $searchItems.append(searchHtml);
// };

// function getAllSearchHtml(searches) {
//   let htmlToAppend = [];
//   for (let i = 0; i<6; i++){
//     htmlToAppend.push(getSearchHtml(searches[i]));
//   }
//   return htmlToAppend.join('');
// }

// function getSearchHtml(search) {
//   return `<div class="quickSearch" data-name=${search.name} data-toggle="modal" data-target="#foodInfo">
//         <b>${search.name}</b>
//       </div>`;
// }


// ///////////////////////////////////////////////////////////
// ///////////////////// NUTRIENT INFO ///////////////////////
// ///////////////////////////////////////////////////////////

// function onError(e) {
//   console.log('POST fail', e);
// }

// function onSuccess(json) {
//   nutrientsInItem = json;
//   renderNutrients();
// }

// function renderNutrients() {
//   $nutrientResults.empty();
//   let nutrientHtml = getNutrientHtml(nutrientsInItem);
//   $nutrientResults.append(nutrientHtml);
// };

// function getNutrientHtml(item) {
//   let nutrientToPost = `<div class="container nutrientBox">
//     <div class="row picAndInfo">
//       <div class="col-sm-3">
//         <img class="pic" src=${item.photo} width="150"></img>
//       </div>
//       <div class="col-sm-9 picInfo">
//         <ul>
//           <li><h2 class="mx-auto">${item.food_name}</h2></li>
//           <li><span class="foodInfo">Quantity: ${item.serving_qty} | Serving Unit: ${item.serving_unit} | Serving Weight: ${item.serving_weight_grams}g</span></li>
//         </ul>
//         <hr>
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-sm-6 col-md-3 extraInfo">
//         <ul>
//           <li>Calories: ${item.calories}</li>
//           <li>Protein: ${item.protein}</li>
//         </ul>
//       </div>
//       <div class="col-sm-6 col-md-3 extraInfo">
//         <ul>
//           <li>Total Carbs: ${item.total_carbs}</li>
//           <li>Fiber: ${item.fiber}</li>
//           <li>Sugar: ${item.sugars}</li>
//         </ul>
//       </div>
//       <div class="col-sm-6 col-md-3 extraInfo">
//         <ul>
//           <li>Total Fat: ${item.total_fat}</li>
//           <li>Saturated Fat: ${item.saturated_fat}</li>
//           <li>Cholesterol: ${item.cholesterol}</li>
//         </ul>
//       </div>
//       <div class="col-sm-6 col-md-3 extraInfo">
//         <ul>
//           <li>Sodium: ${item.sodium}</li>
//           <li>Potassium: ${item.potassium}</li>
//         </ul>
//       </div>
//     </div>
//     <div class="row nutrientButtons">`;


// if ($('#currentUser').hasClass('loggedIn')) {
//       nutrientToPost += `<div class="col-sm-2"></div>
//       <div class="col-sm-1"><button id="saveItem" type="button" name="button" class="btn btn-primary infoBtn">Save</button></div>
//       <div class="col-sm-6"></div>
//       <div class="col-sm-1"><button type="button" name="button" class="btn btn-danger removeItem infoBtn">Remove</button></div>
//       <div class="col-sm-2"></div>
//     </div>
//   </div>`;
//     } else {
//       nutrientToPost += `<div class="col-sm-9"></div>
//       <div class="col-sm-1"><button type="button" name="button" class="btn btn-danger removeItem infoBtn">Remove</button></div>
//       <div class="col-sm-2"></div>
//     </div>
//   </div>`;
//     }

//   return nutrientToPost;
// }

// function nutrientPostError(e) {
//   console.log('nutrient POST fail', e);
// }

// function nutrientPostSuccess(json) {
//   console.log("nutrient POST success");
// }

// ///////////////////////////////////////////////////////////
// ///////////////////// DELETE ITEM /////////////////////////
// ///////////////////////////////////////////////////////////

// function deleteError() {
//   console.log("error deleting");
// }

// function deleteSuccess() {
//   console.log("success deleting");
// }

// ///////////////////////////////////////////////////////////
// ///////////////////// UPDATE ITEM /////////////////////////
// ///////////////////////////////////////////////////////////

// function updateError() {
//   console.log("update error");
// }

// function updateSuccess() {
//   console.log("update success");
// }





