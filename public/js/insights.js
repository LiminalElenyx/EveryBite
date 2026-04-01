import {
    friendlySystemLabels, getLoggedFoods, formatList} 
    from "./utils.js";


function getFriendlyTopSystems(limit = 4) {
  const loggedFoods = getLoggedFoods();
  const systems = [];

  loggedFoods.forEach((food) => {
    if (!food.nutrientInfo) return;

    food.nutrientInfo.forEach((nutrient) => {
      if (!food.nutrientInfo) return;

      nutrient.systems.forEach((system) => {
        const friendlyLabel = friendlySystemLabels[system] || system;

        if (!systems.includes(friendlyLabel)) {
          systems.push(friendlyLabel);
        }
      });
    });
  });
  return limit ? systems.slice(0, limit) : systems;
}

function getTopBenefits(limit) {
  const loggedFoods = getLoggedFoods();
  const benefits = [];

  loggedFoods.forEach((food) => {
    if (!food.nutrientInfo) return;

    food.nutrientInfo.forEach((nutrient) => {
      if (!nutrient.benefits) return;

      nutrient.benefits.forEach((benefit) => {
        if (!benefits.includes(benefit.title)) {
          benefits.push(benefit.title);
        }
      });
    });
  });

  return limit ? benefits.slice(0, limit) : benefits;
}

function buildProgressInsights() {
  const systems = getFriendlyTopSystems();
  const benefits = getTopBenefits(4);

  if (systems.length === 0) {
    return "Log a meal to see nutrition insights.";
  }

  const systemText = formatList(systems);

  if (benefits.length === 0) {
    return "Log a meal to see benefits insights.";
  }
  const benefitsText = formatList(benefits);

  return `Today's intake supports your ${systemText}. Keeping these levels consistent over time can help with ${benefitsText}.`;
}
window.buildProgressInsights = buildProgressInsights;

function renderProgressInsights() {
    const progressContainer = document.querySelector("#progress-insights-container");

    if (!progressContainer) return;

    const insightText = buildProgressInsights();

    progressContainer.innerHTML = `
    <p>${insightText}</p>`;
}
renderProgressInsights();