var edemamKey = '2da4dada354bb264573b3cc442d33d59';
var edemamID = 'ecb6e209';
var mealDBPrefix = 'https://www.themealdb.com/api/json/v2/9973533';

//
var ingredients = $(".ingredients").val();
var meal;


// ***API Keys and URLs for APIs ***

// Used for nutritian facts
var edemamURL = `https://api.edamam.com/api/nutrition-data?app_id=${edemamID}&app_key=${edemamKey}&ingr=${meal}`;

// Gives more details about the meal than the above API
var test = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

//this function calls the api for a single meal showing all the ingredients and how to make it
function testAPI2(){
    $.ajax({
        type: "GET",
        url: test,
    }).then(function (resp2) {
        $(".meal-description").text(resp2.meals[0].strInstructions);
            const element = resp2.meals[0];
            //console.log(element.strIngredient+[i]);
            // for("strIngredient"+i in element){
            //     console.log();
            // }
            var ingredientsArray = [];
            var measurementsArray = [];
            for (const property in element) {
                if (element[property]?.length) {
                    if (property.includes("strIngredient")) {
                        console.log(element[property].length);
                        ingredientsArray.push(element[property]);
                        // $(".ingredients").html("<li>"+element[property]+"</li>")
                    }
                    if (property.includes("strMeasure")) {
                        console.log(element[property]);
                        measurementsArray.push(element[property]);
                        // $(".ingredients li").append(element[property]+"</li>")
                    }
                }// console.log(`${property}: ${element[property]}`);

            }
            for (let i = 0; i < ingredientsArray.length; i++) {
                console.log(ingredientsArray[i]);
                console.log(measurementsArray[i]);
                var ingredientsList = $("<li>").text(`${ingredientsArray[i]}: ${measurementsArray[i]}`)
                $(".ingredients").append(ingredientsList);
            }
            //trying to get ingredients
            // $(".ingredients").append("<li>" + element + "</li>");
            // console.log(element);
            // console.log(element.strIngredient+num);
            
        
    })
}

//on click of button finds recipes for things you have some ingredients for
$(".submit").click(function() {
    // Finds Meals based on ingredients in fridge
    ingredients = $(".ingredients").val();
    var mealDbURL = `${mealDBPrefix}/filter.php?i=${ingredients}`;
    console.log(ingredients);
    console.log(mealDbURL);
    $.ajax({
        url: mealDbURL,
        method: "GET",
        timeout: 1000
      }).then(function (resp) {

        //loop should call 3 meals at somepoint
          for (let i = 0; i < 4; i++) {
              console.log(mealDbURL);
              $(".recipe-choice").html("<p>" + resp.meals[i].strMeal + "</p>");
              console.log(resp.meals[1].strMeal);
              let img = $("<img>").attr("src", resp.meals[i].strMealThumb);
              $(".recipe-choice").append(img);
              meal = resp.meals[i].strMeal.replace(' ', '%20');
              console.log(meal);
    
              //url for a single meal
              test = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
              console.log(resp);
              testAPI2(resp);
    
          }
      });
})


