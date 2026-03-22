console.log("Log is connected");

const form = document.querySelector(".food-search");
const input = form.querySelector("input");
const loggedMealsSection = document.querySelector(".logged-meals");
const mealCard = document.querySelector(".meal-card");
const mealCardText = mealCard.querySelector("p");
const friendlySystemLabels = {
    "Immune system": "immune health",
    "Integumentary system": "skin health",
    "Visual system": "eye health",
    "Skeletal system": "bone health",
    "Endocrine system": "hormone balance",
    "Cardiovascular system": "heart health",
    "Nervous system": "nervous system function",
    "Metabolic system": "energy metabolism",
    "Digestive system": "gut health",
    "Reproductive system": "reproductive health",
    "Cellular function": "cell function",
    "Cellular protection": "cell protection",
    "Muscular system": "muscle function",
    "Respiratory system": "respiratory health",
    "Circulatory system": "healthy circulation"
};

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
        mealBubble.dataset.id = food.id;

        const name = document.createElement("span");
        name.textContent = food.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("delete-btn");

        mealBubble.appendChild(name);
        mealBubble.appendChild(deleteBtn);

        loggedMealsSection.appendChild(mealBubble);
    });
}

function getAllLoggedNutrients() {
    const loggedFoods = getLoggedFoods();

    return loggedFoods.flatMap((food) => food.nutrientInfo || []);
}
//console.log(getAllLoggedNutrients());

//function getUniqueSystems(){
//    const nutrients = getAllLoggedNutrients();

//    const allSystems = nutrients.flatMap((n) => n.systems || []);

//    const uniqueSystems = [...new Set(allSystems)];

//    return uniqueSystems;
//}

function countOccurrences(items) {
    const counts = {};

    items.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
    });

    return counts;
}


function getTopItems(countsObject, limit = 3) {
    return Object.entries(countsObject)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map((entry) => entry[0]);
}

function getTopNutrients(limit = 3) {
    const nutrients = getAllLoggedNutrients();

    const nutrientNames = nutrients.map((n) => n.name);

    const counts = countOccurrences(nutrientNames);

    const topNutrients = getTopItems(counts, limit);

    return topNutrients;
}
//console.log(getTopNutrients());

function getTopSystems(limit = 3) {
    const nutrients = getAllLoggedNutrients();

    const allSystems = nutrients.flatMap((n) => n.systems || []);

    const counts = countOccurrences(allSystems);

    const topSystems = getTopItems(counts, limit);

    return topSystems;

}

function getFriendlyTopSystems(limit = 3) {
    const topSystems = getTopSystems(limit);

    return topSystems.map((system) => {
        return friendlySystemLabels[system] || system;
    });
}

function formatList(items) {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;

    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function buildMealSummary() {
    const topNutrients = getTopNutrients(3);
    const topSystems = getFriendlyTopSystems(3);

    const nutrientText = formatList(topNutrients);
    const systemText = formatList(topSystems);

    return `A great source of ${nutrientText}, today's meal supports ${systemText}.`;
}

function renderMealSummary() {
    const summary = buildMealSummary();

    mealCardText.textContent = summary;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const foodName = input.value.trim();

    const response = await getFoodByName(foodName);

    const loggedFood = createLoggedFood(response);

    const loggedFoods = getLoggedFoods();
    loggedFoods.push(loggedFood);
    saveLoggedFoods(loggedFoods);
    

    renderLoggedFoods();
    renderMealSummary();
    

    
});

loggedMealsSection.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-btn");

    if (!deleteBtn) return;

    const bubble = deleteBtn.closest(".meal-bubble");
    const idToDelete = Number(bubble.dataset.id);

    const loggedFoods = getLoggedFoods();

    const updatedFoods = loggedFoods.filter((food) => food.id !== idToDelete);

    saveLoggedFoods(updatedFoods);

    renderLoggedFoods();
    renderMealSummary();
});

renderLoggedFoods();
renderMealSummary();