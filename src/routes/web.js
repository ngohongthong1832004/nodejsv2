import express from "express";
import * as homeController from "../controller/homeController";
import * as aboutController from "../controller/aboutController";

const router = express.Router();

const initWebRoute = (app) => {
    // Slug route
    router.get("/about/:slug", aboutController.getAbout);
    router.get("/", homeController.getHomeData);
    // root  route
    return app.use("/", router);
};

export default initWebRoute;
