import express from "express";
import * as apiController from "../controller/apiController";

const router = express.Router();

const initApi = (app) => {
    //API restFull
    router.get("/users", apiController.getAllUser);
    router.post("/create-users", apiController.createUser);
    router.put("/update-users", apiController.updateUser);
    router.delete("/delete-users/:id", apiController.deleteUser);
    // root  route
    return app.use("/api/v1/", router);
};

export default initApi;
