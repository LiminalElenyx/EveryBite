console.log("JS connected");

async function getFood(name) {
    try {
        const res = await fetch(
            `http://localhost:8080/api/getFoodByName?foodName=${name}`,
        );
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

//await getFood("orange");


