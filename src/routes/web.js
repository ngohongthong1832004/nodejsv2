import express from "express";
import * as homeController from "../controller/homeController";
import * as aboutController from "../controller/aboutController";
import * as registerController from "../controller/registerController";
import multer from "multer";
import appRootPath from "app-root-path";
import connection from "../configs/connectDB";
// import { path } from "app-root-path";
import path from "path";
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("appRootPath :", appRootPath);
        cb(null, appRootPath + "/src/public/imgs");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });
const router = express.Router();

const initWebRoute = (app) => {
    // Slug route

    router.get("/getCreateUser", aboutController.createUserForm);
    router.post("/update-user", aboutController.updateUser);
    router.get("/user/detail/:id", aboutController.getUserDetail);
    router.get("/user/edit/:id", aboutController.getEditUser);
    router.post("/user/delete/:id", aboutController.deleteUser);
    router.post("/create-user", aboutController.createUser);
    router.get("/about/:slug", aboutController.getAbout);
    router.get("/upload", homeController.upload);
    router.get("/signup", registerController.signup);
    router.get("/login", registerController.login);
    router.get("/home", homeController.getHomeData);

    router.get("/get-all-imgs", (req, res) => {
        connection.query(
            "SELECT * FROM imgs",
            async function (err, results, fields) {
                // res.render("detail.ejs", { dataUser: results[0] });
                res.render("img.ejs", { data: results });
            }
        );
    });

    router.post("/profile", upload.single("avatar"), function (req, res, next) {
        // req.file is the `avatar` file
        console.log("save File");
        console.log("req.file : ", req.file);
        console.log("req.body : ", req.body);

        var sql = `INSERT INTO imgs ( file_img ) VALUES ( ? )`;
        connection.query(sql, [req.file.filename], function (err, data) {
            if (err) {
                // some error occured
            } else {
                // successfully inserted into db
            }
        });
        res.redirect("/get-all-imgs");
    });
    // root  route
    return app.use("/", router);
};

export default initWebRoute;
