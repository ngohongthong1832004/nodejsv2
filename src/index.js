const express = require("express");
const app = express();

import configViewEngine from "./configs/configViewEngine";

const port = 3002;

configViewEngine(app);
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
