import * as dotenv from "dotenv";
import initWebRoute from "./routes/web";
import connection from "./configs/connectDB";
dotenv.config();

const express = require("express");

const app = express();
import configViewEngine from "./configs/configViewEngine";

const port = process.env.PORT || 3002;
//set up  view engine
configViewEngine(app);
//set up router
initWebRoute(app);
//connect DB

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
