import connection from "../configs/connectDB";

export const getAbout = (req, res) => {
    res.render("about.ejs");
};

export const createUser = (req, res) => {
    const { first_name, last_name, email } = req.body;

    var sql = `INSERT INTO users 
            (
                first_name, last_name, email
            )
            VALUES
            (
                ?, ?, ?
            )`;
    connection.query(sql, [first_name, last_name, email], function (err, data) {
        if (err) {
            // some error occured
        } else {
            // successfully inserted into db
        }
    });
    // let sql = `INSERT INTO users (first_name,last_name,email)`;
    // connection.execute(sql, (first_name, last_name, email));
    res.redirect("/home");
};

export const deleteUser = (req, res) => {
    const userId = req.body.id;

    var sql = `DELETE FROM users WHERE id =  ? `;
    connection.query(sql, [userId], function (err, data) {
        if (err) {
            // some error occured
        } else {
            // successfully inserted into db
        }
    });

    res.redirect("/home");
};

export const getUserDetail = (req, res) => {
    console.log(`"userId : ${req.params.id} "`);
    const userId = req.params.id;
    connection.query(
        "SELECT * FROM `users` where `id` = ?",
        [userId],
        async function (err, results, fields) {
            // const dataUser = await [...results.map((row) => row)];
            // const rs = await res.render("detail.ejs", {
            //     dataUser,
            // });
            // console.log("rs : ", rs);

            console.log("results : ", results);
            res.render("detail.ejs", { dataUser: results[0] });
        }
    );
};

export const getEditUser = (req, res) => {
    console.log(`"userId : ${req.params.id} "`);
    const userId = req.params.id;
    connection.query(
        "SELECT * FROM `users` where `id` = ?",
        [userId],
        async function (err, results, fields) {
            res.render("edit.ejs", { dataUser: results[0] });
        }
    );
};

export const updateUser = (req, res) => {
    const { first_name, last_name, email, id } = req.body;

    var sql = `UPDATE users set first_name = ? , last_name = ? , email = ? where id = ? `;
    connection.query(
        sql,
        [first_name, last_name, email, id],
        function (err, data) {
            if (err) {
                // some error occured
            } else {
                // successfully inserted into db
            }
        }
    );
    // let sql = `INSERT INTO users (first_name,last_name,email)`;
    // connection.execute(sql, (first_name, last_name, email));
    res.redirect("/home");
};
export const createUserForm = (req, res) => {
    res.render("createUser.ejs");
};
