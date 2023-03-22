import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import moment from "moment";

export const signup = async (req, res) => {
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "nodejsbasic",
    });

    try {
        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await connection.execute(
            "SELECT * FROM `account` where email = ?",
            [email]
        );

        console.log("oldUser :", oldUser[0]);

        if (oldUser[0][0]) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const addUser = await connection.execute(
            `INSERT INTO account 
            (
                first_name, last_name, email, password
            )
            VALUES
            (
                ?, ?, ?, ?
            )`,
            [first_name, last_name, email, encryptedPassword]
        );

        const token = await jwt.sign(
            { _id: addUser._id, email },
            process.env.TOKEN_KEY
        );
        const addToken = await connection.execute(
            `UPDATE account set token = ? where email = ? `,
            [token, email]
        );

        process.env.TOKEN_KEY = token;

        const getUser = await connection.execute(
            `select * from account where email = ?`,
            [email]
        );

        // res.status(201).json(getUser);
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
    // res.redirect("/login");
};

export const getSignUpForm = (req, res) => {
    res.render("signup.ejs");
};

export const getLogInForm = (req, res) => {
    res.render("login.ejs");
};
export const logout = (req, res) => {
    res.cookie("auth", "token", {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.redirect("/");
};
export const login = async (req, res) => {
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "nodejsbasic",
    });

    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await connection.execute(
            "select * from account where email = ?",
            [email]
        );

        console.log("user[0][0] :", user[0][0]);

        if (
            user[0][0] &&
            (await bcrypt.compare(password, user[0][0].password))
        ) {
            // Create token
            const token = jwt.sign(
                { _id: user[0][0]._id, email },
                process.env.TOKEN_KEY
            );

            // save user token to DB
            const addToken = await connection.execute(
                `UPDATE account set token = ? where email = ? `,
                [token, email]
            );

            //save the user token to cookie
            res.cookie("auth", token, {
                expires: new Date(Date.now() + 30000000),
                httpOnly: true,
            });
            // user
            res.redirect("/home?page=1");
        }
        res.send("Email or password is invalid");
    } catch (error) {
        console.log(error);
    }
};

export const getSetting = async (req, res) => {
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "nodejsbasic",
    });

    const showUser = req.user._id;

    const userAccount = await connection.execute(
        "SELECT * FROM `account` where _id = ?",
        [showUser]
    );

    const fullName =
        userAccount[0][0].first_name + " " + userAccount[0][0].last_name;
    const userInfo = userAccount[0][0];

    const getImg = await connection.execute(
        "select * from account where email = ?",
        [userAccount[0][0].email]
    );

    const avatarPath = getImg[0][0].file_img;
    // console.log(
    //     "time ne :",
    //     moment(userInfo.date, "DD/MM/YYYY", true).format()
    // );
    // console.log("time 2 ne :", moment(String(userInfo.date)));
    res.render("setting.ejs", {
        fullName,
        userInfo,
        avatarPath: avatarPath || "avatar.jpg",
    });
};

export const updateAccount = async (req, res) => {
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "nodejsbasic",
    });
    const { first_name, last_name } = req.body;

    // console.log("req.user :", req.user.email);
    const email = req.user.email;

    // console.log({ first_name, last_name });
    const user = await connection.execute(
        `UPDATE account set first_name = ? , last_name = ? where email = ?`,
        [first_name, last_name, email]
    );

    const getUser = await connection.execute(
        "select * from account where email =?",
        [email]
    );

    const updateImg = await connection.execute(
        `UPDATE  account set  file_img = ? where email = ?`,
        [req.file?.filename || getUser[0][0]?.file_img || "avatar.jpg", email]
    );

    res.redirect("/setting");
};
