var edemamKey = '2da4dada354bb264573b3cc442d33d59';
var edemamID = 'https://api.edamam.com/api/nutrition-data?app_id=ecb6e209';
var mealDBPrefix = 'https://www.themealdb.com/api/json/v2/9973533';

//
var ingredients = $(".ingredients").val();
var meal;
var edemamMeal;

// ***API Keys and URLs for APIs ***


// Used for nutritian facts
var edemamURL = `${edemamID}&app_key=${edemamKey}&ingr=${meal}`;

// Gives more details about the meal than the above API
var test = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

//this function calls the api for a single meal showing all the ingredients and how to make it
function testAPI2(){
    $.ajax({
        type: "GET",
        url: test,
    }).then(function (resp2) {

        /**
         * I've gotten the api to send over the first 3
         * recipes and ingredients with this loop.
         * Cannot figure out how to seperate them
         * though. I want the description and ingredients to
         * fall under their respective picture
         */
        for (let index = 0; index < 3; index++) {
            let foobar = "<p>" + resp2.meals[index].strInstructions + "</p>";
            $(".meal-description").html(foobar);
            const element = resp2.meals[index];
            //console.log(element.strIngredient+[i]);
            // for("strIngredient"+i in element){
            //     console.log();
            // }

            // Empty arrays to store ingredients/measurements in
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
                $(".meal-description").append(ingredientsList);
            }

            /**
             * Empty arrays after each iteration of the
             * starting loop. This way it populates seperate
             * ingredients/measurement lists for each
             */
            ingredientsArray = [];
            measurementsArray = [];
        }
        
            
        
    })
}

// On click of button finds recipes for things you have some ingredients for

$("#searchForm").submit(function(e) {
    // Finds Meals based on ingredients in fridge
    e.preventDefault();
    ingredients = $(".ingredients").val();
    var mealDbURL = `${mealDBPrefix}/filter.php?i=${ingredients}`;
    // console.log(ingredients);
    // console.log(mealDbURL);

    $.ajax({
        url: mealDbURL,
        method: "GET",
        timeout: 1000
      }).then(function (resp) {
        //loop sends first 3 meals
        $("#recipe-cards").empty();
          for (let i = 0; i < 3; i++) {
              console.log(mealDbURL);
              $("#recipe-cards").append($("<h1>").text(resp.meals[i].strMeal));
              console.log(resp.meals[1].strMeal);
              let img = $("<img>").attr("src", resp.meals[i].strMealThumb);
              img.addClass([i+1])
              $("#recipe-cards").append(img);
              meal = resp.meals[i].strMeal.replace(' ', '%20');
              console.log(meal);
    
              //url for a single meal 
              test = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
              console.log(resp);

              /**
               * This sends over all the important 
               * details of a single meal
               */
            //   testAPI2(resp);


              $.ajax({
                type: "GET",
                url: test,
            }).then(function (resp2) {
        
                /**
                 * I've gotten the api to send over the first 3
                 * recipes and ingredients with this loop.
                 * Cannot figure out how to seperate them
                 * though. I want the description and ingredients to
                 * fall under their respective picture
                 */
                for (let index = 0; index < 3; index++) {
                    let foobar = "<p>" + resp2.meals[index].strInstructions + "</p>";
                    $("#recipe-cards").append(foobar);
                    const element = resp2.meals[index];
                    //console.log(element.strIngredient+[i]);
                    // for("strIngredient"+i in element){
                    //     console.log();
                    // }
        
                    // Empty arrays to store ingredients/measurements in
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
                        $("#recipe-cards").append(ingredientsList);
                    }
        
                    /**
                     * Empty arrays after each iteration of the
                     * starting loop. This way it populates seperate
                     * ingredients/measurement lists for each
                     */
                    ingredientsArray = [];
                    measurementsArray = [];
                }
                
                    
                
            })
    
          }
      });
})