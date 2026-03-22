console.log("Log is connected");

const form = document.querySelector(".food-search");
const input = form.querySelector("input");
const loggedMealsSection = document.querySelector(".logged-meals");

async function getFoodByName(name) {
    try {
        const res = await fetch(
            `http://localhost:8080/api/getFoodByName?foodName=${encodeURIComponent(name)}`
        );

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function createLoggedFood(foodData) {
    return {
        id: Date.now(),
        name: foodData.name,
        loggedAt: new Date().toISOString(),
        nutrientInfo: foodData.nutrientInfo
    };
}

function getLoggedFoods() {
    const storedFoods = localStorage.getItem("loggedFoods");
    return storedFoods ? JSON.parse(storedFoods) : [];
}

function saveLoggedFoods(foods) {
    localStorage.setItem("loggedFoods", JSON.stringify(foods));
}

function renderLoggedFoods() {
    const loggedFoods = getLoggedFoods();

    loggedMealsSection.innerHTML = "";

    loggedFoods.forEach((food) => {
        const mealBubble = document.createElement("article");
        mealBubble.classList.add("meal-bubble");
        mealBubble.textContent = food.name;

        loggedMealsSection.appendChild(mealBubble);
    });

}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const foodName = input.value.trim();
    console.log("Submitting food:", foodName);

    const response = await getFoodByName(foodName);
    console.log("Food response received");

    const loggedFood = createLoggedFood(response);
    console.log("Logged food created:", loggedFood);

    const loggedFoods = getLoggedFoods();
    loggedFoods.push(loggedFood);
    saveLoggedFoods(loggedFoods);
    console.log("Foods saved");

    renderLoggedFoods();
    console.log("Render function called");

    
});
renderLoggedFoods();