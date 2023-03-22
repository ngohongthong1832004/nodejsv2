import express from "express";
import * as homeController from "../controller/homeController";
import * as aboutController from "../controller/aboutController";
import * as registerController from "../controller/registerController";
import auth from "../middleware/auth";
import multer from "multer";
import appRootPath from "app-root-path";
import connection from "../configs/connectDB";
// import { path } from "app-root-path";
import path from "path";
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
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

    router.get("/getCreateUser", auth, aboutController.createUserForm);
    router.post("/update-user", auth, aboutController.updateUser);
    router.get("/user/detail/:id", auth, aboutController.getUserDetail);
    router.get("/user/edit/:id", auth, aboutController.getEditUser);
    router.post("/user/delete/:id", auth, aboutController.deleteUser);
    router.post("/create-user", auth, aboutController.createUser);
    router.get("/about/:slug", auth, aboutController.getAbout);
    router.get("/upload", auth, homeController.upload);

    router.get("/signup", registerController.getSignUpForm);
    router.post("/signup-get", registerController.signup);

    router.get("/login", registerController.getLogInForm);
    router.post("/login-get", registerController.login);

    router.get("/logout", registerController.logout);

    router.get("/home", auth, homeController.getHomeData);

    router.get("/setting", auth, registerController.getSetting);
    router.post(
        "/update-account",
        auth,
        upload.single("img"),
        registerController.updateAccount
    );

    router.post("/search", auth, homeController.search);
    router.get("/", (req, res) => {
        res.redirect("/login");
    });

    router.get("/get-all-imgs", auth, (req, res) => {
        connection.query(
            "SELECT * FROM imgs",
            async function (err, results, fields) {
                // res.render("detail.ejs", { dataUser: results[0] });
                res.render("img.ejs", { data: results });
            }
        );
    });

    router.post(
        "/profile",
        auth,
        upload.single("avatar"),
        function (req, res, next) {
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
        }
    );
    router.post(
        "/update-img-account",
        auth,
        upload.single("avatar"),
        function (req, res, next) {
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
        }
    );
    // root  route
    return app.use("/", router);
};

export default initWebRoute;
