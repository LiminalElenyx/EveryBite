"use strict";

export async function getFoodDataByName(foodName) {
    const secretKey = "YOUR API KEY HERE";
    const endpoint =
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&dataType=Foundation,SR%20Legacy&pageSize=1&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=${secretKey}`;

    try {
        const res = await fetch(endpoint);
        const data = await res.json();


        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getNutrient(data) {
    const foods = data.foods;
    const nutrientData = [];

    foods.forEach((food) => {
    
        food.foodNutrients.forEach((nutrient) => {
        
            nutrientData.push(nutrient);
        });
    });

    const combinedData = {
        name: data.foodSearchCriteria.query,
        nutrients: nutrientData,
    };
    console.log(combinedData);

    return combinedData;
}


const data = await getFoodDataByName("orange");
const combinedData = await getNutrient(data);
console.log(combinedData);