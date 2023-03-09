import express from "express";
import * as homeController from "../controller/homeController";
import * as aboutController from "../controller/aboutController";

const router = express.Router();

const initWebRoute = (app) => {
    // Slug route

    router.post("/update-user", aboutController.updateUser);
    router.get("/user/detail/:id", aboutController.getUserDetail);
    router.get("/user/edit/:id", aboutController.getEditUser);
    router.post("/user/delete/:id", aboutController.deleteUser);
    router.post("/create-user", aboutController.createUser);
    router.get("/about/:slug", aboutController.getAbout);
    router.get("/", homeController.getHomeData);
    // root  route
    return app.use("/", router);
};

export default initWebRoute;
