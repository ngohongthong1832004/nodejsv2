import * as dotenv from "dotenv";
import initWebRoute from "./routes/web";
// import connection from "./configs/connectDB";
import configViewEngine from "./configs/configViewEngine";
import bodyParser from "body-parser";

const express = require("express");
const app = express();

// use form to connext with server ( can access req.body )
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const port = process.env.PORT || 3002;
//set up  view engine
configViewEngine(app);
//set up router
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
