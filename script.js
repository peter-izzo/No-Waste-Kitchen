var edemamKey = '2da4dada354bb264573b3cc442d33d59';
var edemamID = 'ecb6e209';
var mealDBKey = '9973533';

//
var ingredients = "eggs"
var meal = "Frosted%20Flakes"

//API Keys and URLs for APIs
var mealDbURL = `https://www.themealdb.com/api/json/v2/${mealDBKey}/filter.php?i=${ingredients}`;
var edemamURL = `https://api.edamam.com/api/nutrition-data?app_id=${edemamID}&app_key=${edemamKey}&ingr=${meal}`;




$.ajax({
    url: edemamURL,
    method: "GET"
  }).then(function (resp) {
      console.log(resp);
  });



