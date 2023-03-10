import connection from "../configs/connectDB";

export const getAllUser = (req, res) => {
    connection.query(
        "SELECT * FROM `users`",
        async function (err, results, fields) {
            res.json({ data: results });
        }
    );
};
export const createUser = (req, res) => {
    const { first_name, last_name, email } = req.body;

    if (!first_name || !last_name || !email) {
        return res.send("loi me r thang ngu ( khong truyen body kia )");
    }

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

    res.send("thanh cong me roi");
};
export const updateUser = (req, res) => {
    const { first_name, last_name, email, id } = req.body;

    if (!first_name || !last_name || !email || !id) {
        return res.send("loi me r thang ngu ( khong truyen body kia )");
    }

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
    res.send("thanh cong me roi");
};
export const deleteUser = (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.send("loi me r thang ngu ( khong truyen body kia )");
    }

    var sql = `DELETE FROM users WHERE id =  ? `;
    connection.query(sql, [userId], function (err, data) {
        if (err) {
            // some error occured
        } else {
            // successfully inserted into db
        }
    });
    res.send("thanh cong me roi");
};
