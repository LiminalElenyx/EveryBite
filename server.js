import express from "express";
import "dotenv/config";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;

const corsOptions = cors({
    origin: `http://localhost:${port}`,
});

app.use(cors({ corsOptions }));
app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nutrientsFilePath = path.join(__dirname, "data", "nutrientInfo.json");

async function getFoodDataByName(foodName) {
    const endpoint = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&dataType=Foundation,SR%20Legacy&pageSize=1&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=${process.env.USDA_API_KEY}`;

    try {
        const res = await fetch(endpoint);
        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getNutrient(data) {
    try {
        const foods = data.foods;
        const nutrientData = [];
        const nutrientInfo = await getNutrients();

        foods.forEach((food) => {
            food.foodNutrients.forEach((nutrient) => {
                nutrientData.push(nutrient);
            });
        });

        const nutrientInFoodIds = nutrientData.map((n) => n.nutrientId);

        const relatedNutritents = nutrientInfo.filter((n) =>
            nutrientInFoodIds.includes(n.id),
        );
    

        nutrientData.forEach((element, idx) => {
        
            if (element.nutrientId === nutrientInFoodIds[idx]) {
                nutrientData.push(element);
            }
        });

        const combinedData = {
            name: data.foodSearchCriteria.query,
            nutrients: nutrientData,
            nutrientInfo: relatedNutritents,
        };

        return combinedData;
    } catch (error) {
        console.error(error);
    }
}

app.get("/api/getFoodByName", async (req, res) => {
    if (!req.query.foodName) {
        return res.status(400).json("No food name provided");
    }

    try {
        const foodData = await getFoodDataByName(req.query.foodName);
        const combinedData = await getNutrient(foodData);

        res.status(200).json(combinedData);
    } catch (error) {
        console.error(error);
    }
});

async function getNutrients() {
    try {
        const nutrientData = await fs.readFile(nutrientsFilePath);
        return JSON.parse(nutrientData);
    } catch (error) {
        console.error(error);
    }
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
