# EveryBite – Nutrition & Wellness Tracker
EveryBite is a full-stack web application designed to help users track food intake and understand how nutrients impact overall health. Instead of focusing only on macronutrients, the app emphasizes micronutrient awareness, helping users understand long-term effects of their dietary patterns.

## Current Functionality
- Search foods using USDA FoodData Central API
- Retrieve detailed nutrient data for selected foods
- Search and explore individual nutrients
- Log foods to a daily tracker
- Store logged foods using localStorage
- Dynamically render logged meals and nutrient summaries
- Display nutrient details including RDI, benefits, and affected body systems
- Generate progress insights highlighting top nutrients and supported body systems
- Aggregate and display daily nutrient totals from logged foods

## Project Requirements Implemented
This project was built to meet the following development requirements:

-**Data Analysis and Rendering**<br>
  Implemented data aggregation and analysis using arrays and objects to calculate daily nutrient totals, identify top nutrients, and generate insights. Results are dynamically rendered in the UI through features like Daily Nutrient Summary and Progress Insights. 

-**Persist Data Storage**<br>
  User data (logged foods) is stored in localStorage, allowing the application to retain state across page reloads. Stored data is retrieved and used to rebuild the UI and recalculate nutrient summaries and insights. 

-**Node.js and Express Server**<br>
  Built a backend server (with mentor guidance) using Express.js to handle API requests. 

## Tech Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js, used to build backend server that handles API requests and integrates data sources 
- USDA FoodData Central API
- Local JSON data
- LocalStorage

## Development Overview
This app uses an Express.js backend to handle API requests and act as an intermediary between the frontend and the USDA FoodData Central API. A custom nutrients.json file serves as a local data layer, and shared utility functions (utils.js) are used to process, aggregate, and format nutrient data across features. 

## How It Works:
**EveryBite** is structured around multiple user flows that interact with a shared data layer and API.
  ### Log a Meal
  1. User searches for a food item
  2. Frontend sends a request to Express backend
  3. Backend queries the USDA FoodData Central API
  4. Nutrient data is returned and enriched using the local nutrients.json dataset
  5. User logs the food item
  6. Logged data is stored in localStorage
  7. UI updates to render logged meals and generate a dynamic meal summary based on top nutrients and supported body systems 

  ### Search for Nutrients
  1. User searches for desired nutrient
  2. Nutrient data is retrieved from the local nutrients.json dataset
  3. Application displays nutrient descriptions, recommended daily intake (RDI), health benefits, and related body systems
  4. Users can explore nutrients independently of specific foods

  ### Daily Nutrient Summary 
  Aggregates nutrient data from all logged foods and calculates total intake per nutrient for the day. Displays a running summary of nutrient amounts and units, providing users with a clear snapshot of their daily nutritional intake. 

  ### Progress Insights 
  Generates dynamic insights based on aggregated nutrient data from logged foods, highlighting the most frequently consumed nutrients and the primary body systems supported.
  

## Future App Goals
- Nutrient trend analysis over time
- Personalized recommendations based on deficiencies
- Mood and energy tracking linked to dietary patterns
- User profile setup and advanced dietary/goal based filtering

## Using EveryBite
### Setup & Installation 
```
git clone https://github.com/LiminalElenyx/EveryBite.git
cd EveryBite
npm install
npm run dev
```
### How to use
Open your browser and navigate to:
http://localhost:8080

**Log a Meal** 
- Search for food item
- Select and log it
- View top occurring nutrients and top bodily systems affected
- View updated daily nutrient totals *(to come)*

**Search for Nutrients**
- Search for a specific nutrient
- View descriptions, RDI, benefits, and related body systems

### Responsible AI Usage
AI-assisted tools were used during development to help generate and structure the initial nutrients.json dataset, including nutrient descriptions, RDI, id #, and related bodily systems, as well as ensured consistency across the dataset. 
AI assisted in accelerating dataset creation, was utilized to validate approaches and refine function logic during development, and checked for spelling and syntax errors. 
AI was used as a supporting tool and reviewed for accuracy. 

  
