import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
            { user_id: addUser._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
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

        res.status(201).json(getUser);
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

export const login = (req, res) => {
    res.send("login.ejs");
};
