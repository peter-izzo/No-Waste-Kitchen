var edemamKey = '2da4dada354bb264573b3cc442d33d59';
var edemamID = 'ecb6e209';
var mealDBKey = '9973533';

//
var ingredients = "eggs";
var meal;


//API Keys and URLs for APIs
var mealDbURL = `https://www.themealdb.com/api/json/v2/${mealDBKey}/filter.php?i=${ingredients}`;
var edemamURL = `https://api.edamam.com/api/nutrition-data?app_id=${edemamID}&app_key=${edemamKey}&ingr=${meal}`;
var test = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

//this function calls the api for a single meal showing all the ingredients and how to make it
function testAPI2(){
    $.ajax({
        type: "GET",
        url: test,
    }).then(function (resp2) {
        console.log(resp2);
        $(".meal-description").text(resp2.meals.strInstructions);
        console.log(resp2.meals);
        for (let i = 1; i < 21; i++) {
            const element = resp2.meals.strIngredient[i];

            //trying to get ingredients
            $(".ingredients").append("<li>" + element + "</li>");
            console.log(element);
            
        }
        
    })
}

//on click of button finds recipes for things you have some ingredients for
$(".submit").click(function() {
    ingredients = $(".ingredients").val();
    $.ajax({
        url: mealDbURL,
        method: "GET"
      }).then(function (resp) {
          $(".recipe-choice").html("<p>" + resp.meals[1].strMeal + "</p>");
          console.log(resp.meals[1].strMeal);
          let img = $("<img>").attr("src", resp.meals[1].strMealThumb);
          $(".recipe-choice").append(img);
          meal = resp.meals[1].strMeal.replace(' ', '%20');
          console.log(meal);
          test = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
          console.log(test);
          console.log(resp);
          setTimeout(testAPI2(resp), 1000);
      });
})


