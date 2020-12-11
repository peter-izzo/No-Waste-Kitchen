// DOM selectors
var item1 = document.querySelector('item1');
var item2 = document.querySelector('item2');
var item3 = document.querySelector('item3');
var item4 = document.querySelector('item4');
var searchResults = document.querySelector('recipeResults');

// Event listener
$(item1).submit(function(e) {
  e.preventDefault;
  ingredients = e.target.querySelector("item-1").value;
});


// API and Application Keys
var edemamKey = '2da4dada354bb264573b3cc442d33d59';
var edemamID = 'ecb6e209';
var mealDBKey = '9973533';

//
var ingredients = "";
var meal = "Frosted%20Flakes"

//API Keys and URLs for APIs
var mealDbURL = `https://www.themealdb.com/api/json/v2/${mealDBKey}/filter.php?i=${ingredients}`;
var edemamURL = `https://api.edamam.com/api/nutrition-data?app_id=${edemamID}&app_key=${edemamKey}&ingr=${meal}`;





$(".button-primary").click(function() {
    ingredients = $(".ingredients").val().replace(/\s/g,'');
    $.ajax({
        url: mealDbURL,
        method: "GET"
      }).then(function (resp) {
          $(".recipe-choice").html("<p>" + resp.meals[1].strMeal);
          console.log(resp.meals[1].strMeal + "</p>");
          let img = $("<img>").attr("src", resp.meals[1].strMealThumb);
          $(".recipe-choice").append(img);
          console.log(resp);
      });
})


