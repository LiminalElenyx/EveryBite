async function getNutrientByName(name) {
  try {
    const res = await fetch(
      `http://localhost:8080/api/getNutrientByName?name=${encodeURIComponent(name)}`,
    );
    const data = await res.json();

    if (!res.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

const form = document.querySelector(".nutrient-search");
const input = document.getElementById("nutrient-input");
const resultContainer = document.getElementById("nutrient-result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nutrientName = input.value.trim();

  const response = await getNutrientByName(nutrientName);

  if (!response || response.status !== 200 || !response.data) {
    resultContainer.style.display = "block";
    resultContainer.querySelector("h3").textContent = "Nutrient not found";
    resultContainer.querySelector("p").textContent =
      "Try searching with a different nutrient name.";
    document.getElementById("nutrient-rdi").textContent = "";

    resultContainer.querySelector(".benefits-section").innerHTML = "";
    resultContainer.querySelector(".systems-section").innerHTML = "";
    resultContainer.querySelector(".foods-section").innerHTML = "";

    return;
  }

  const nutrient = response.data;

  const nameElement = resultContainer.querySelector("h3");
  const summaryElement = resultContainer.querySelector("p");
  const rdiElement = document.getElementById("nutrient-rdi");
  const benefitsSection = resultContainer.querySelector(".benefits-section");

  nameElement.textContent = nutrient.name;
  summaryElement.textContent = nutrient.summary;
  rdiElement.textContent = `${nutrient.RDI}/day`;

  resultContainer.style.display = "block";
  input.value = "";

  benefitsSection.innerHTML = "";

  const benefitsHeading = document.createElement("h4");
  benefitsHeading.textContent = "Benefits";
  benefitsSection.appendChild(benefitsHeading);

  nutrient.benefits.forEach((benefit) => {
    const benefitWrapper = document.createElement("div");

    const benefitTitle = document.createElement("h5");
    benefitTitle.textContent = benefit.title;

    const benefitBody = document.createElement("p");
    benefitBody.textContent = benefit.body;

    benefitWrapper.appendChild(benefitTitle);
    benefitWrapper.appendChild(benefitBody);

    benefitsSection.appendChild(benefitWrapper);
  });

  const systemsSection = resultContainer.querySelector(".systems-section");

  systemsSection.innerHTML = "";

  const systemsHeading = document.createElement("h4");
  systemsHeading.textContent = "Systems Affected";
  systemsSection.appendChild(systemsHeading);

  const systemsList = document.createElement("ul");

  nutrient.systems.forEach((system) => {
    const systemItem = document.createElement("li");
    systemItem.textContent = system;
    systemsList.appendChild(systemItem);
  });

  systemsSection.appendChild(systemsList);

  const foodsSection = resultContainer.querySelector(".foods-section");

  foodsSection.innerHTML = "";

  const foodsHeading = document.createElement("h4");
  foodsHeading.textContent = "Top Food Sources";
  foodsSection.appendChild(foodsHeading);

  const foodsList = document.createElement("ul");

  nutrient.topFoodSources.forEach((food) => {
    const foodItem = document.createElement("li");
    foodItem.textContent = food;
    foodsList.appendChild(foodItem);
  });
  foodsSection.appendChild(foodsList);
});
