
//API Keys and URLs for APIs
var mealDbURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}'

var edemamKey = '2da4dada354bb264573b3cc442d33d59';

var ingredient = "macaroni"

//test call to the meal db. Updating later with API key so 
//we can search recipes based on 2+ items
$.ajax({
    url: mealDbURL,
    method: "GET"
  }).then(function (resp) {
      console.log(resp);
  });

 