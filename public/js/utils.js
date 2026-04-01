export const friendlySystemLabels = {
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
  "Circulatory system": "healthy circulation",
};

export function getLoggedFoods() {
  const storedFoods = localStorage.getItem("loggedFoods");
  return storedFoods ? JSON.parse(storedFoods) : [];
}

export function formatList(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
