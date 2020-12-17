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

function callOne(mealDbURL) {
    return $.ajax({
        url: mealDbURL,
        method: "GET"
      })
}

//This should return more detailed info on recipe
function callTwo(meal){
    return $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`,
        method: "GET"
    })
}

// On click of button finds recipes for things you have some ingredients for
async function handleSubmit() {

    ingredients = $(".ingredients").val();
    var mealDbURL = `${mealDBPrefix}/filter.php?i=${ingredients}`;

    var resp = await callOne(mealDbURL);



    console.log(resp2);


    for (let i = 0; i < 3; i++) {

        

            /**
             * /////////////////
             * FIRST CALL
             *  **WORKS**
             * /////////////////
             */
        
            $("#recipe-cards").append($("<h1>").text(resp.meals[i].strMeal));
            let img = $("<img>").attr("src", resp.meals[i].strMealThumb);
            img.addClass([i+1])
            $("#recipe-cards").append(img);
            meal = resp.meals[i].strMeal.replaceAll(' ', '%20');

            /**
             * ////////////////////////
            * resp2 must be defined in the loop or the meal value is never 
            * given to callTwo.
            * Must also be defined after first meal is set or the count
            * will be off
            * /////////////////////////
            */
            var resp2 = await callTwo(meal);
            console.log(meal);


            //test returns the correct address as expected
            console.log(test);

            /**
             
             */

            /**
             * //////////////////
             *  ****SECOND CALL****
             * This sends over all the important 
             * details of a single meal
             * //////////////////
             */
            let foobar = "<p>" + resp2.meals[0].strInstructions + "</p>";
            $("#recipe-cards").append(foobar);
            const element = resp2.meals[0];
            console.log(element);


            var ingredientsTitle = $("<h2>").text("Ingredients");
            ingredientsTitle.addClass("ingredients")
            $("#recipe-cards").append(ingredientsTitle);

            // Empty arrays to store ingredients/measurements in
            var ingredientsArray = [];
            var measurementsArray = [];
            for (const property in element) {
                if (element[property]?.length) {
                    if (property.includes("strIngredient")) {
                        console.log(element[property].length);
                        ingredientsArray.push(element[property]);
                    }
                    if (property.includes("strMeasure")) {
                        console.log(element[property]);
                        measurementsArray.push(element[property]);
                    }
                }

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

}
$("#searchForm").submit(function(e) {
    //empty out recipe cards so page doesn't become endless
    $("#recipe-cards").empty();
    e.preventDefault();
    handleSubmit(e);
});

    
