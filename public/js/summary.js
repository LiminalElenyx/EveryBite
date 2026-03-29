const summaryContainer = document.getElementById("daily-summary-container");

function getLoggedFoods() {
  const storedFoods = localStorage.getItem("loggedFoods");
  return storedFoods ? JSON.parse(storedFoods) : [];
}

const loggedFoods = getLoggedFoods();

console.log("Logged foods:", loggedFoods);

loggedFoods.forEach((food) => {
  food.nutrients.forEach((nutrient) => {
    console.log(nutrient.nutrientName, nutrient.value, nutrient.unitName);
  });
});

function totalNutrients(loggedFoods) {
  let nutrientSummary = {};

  loggedFoods.forEach((food) => {
    food.nutrients.forEach((nutrient) => {
      const name = nutrient.nutrientName;
      const value = nutrient.value;
      const unit = nutrient.unitName;

      if (nutrientSummary[name]) {
        nutrientSummary[name].amount += value;
      } else {
        nutrientSummary[name] = {
          amount: value,
          unit: unit,
        };
      }
    });
  });

  return nutrientSummary;
}
const totals = totalNutrients(loggedFoods);
console.log("Totals:", totals);

let output = "";
Object.entries(totals).forEach(([name, data]) => {
  output += `${name}: ${data.amount} ${data.unit}<br>`;
});

summaryContainer.innerHTML = output;
