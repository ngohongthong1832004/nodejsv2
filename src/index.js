import * as dotenv from "dotenv";
import initWebRoute from "./routes/web";
import initApi from "./routes/api";
// import connection from "./configs/connectDB";
import configViewEngine from "./configs/configViewEngine";
import bodyParser from "body-parser";

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

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
//set API RESTfull
initApi(app);

//Middleware 404
app.use((req, res) => {
    res.send("404 not found");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
