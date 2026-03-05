import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 8080 || 8085;

const corsOptions = cors({
    origin: `http://localhost:${port}`,

});

app.use(cors({corsOptions}));
app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});