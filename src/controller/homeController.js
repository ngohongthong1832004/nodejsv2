export const getHomeData = async (req, res) => {
    const mysql = require("mysql2/promise");
    const page = req.query.page;
    // create the connection

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "nodejsbasic",
    });
    // query database
    const rs = await connection.execute("SELECT * FROM `users` LIMIT ?,5 ", [
        (Number(page) - 1) * 5 || 0,
    ]);

    const count = await connection.execute("SELECT COUNT(id) FROM `users`", [
        (Number(page) - 1) * 5 || 0,
    ]);
    const countUser = count[0][0]["COUNT(id)"];
    // Promise.all([])
    const maxPage = Math.ceil(countUser / 5);

    const paginationArr = function (maxPage, eachSide, page) {
        let start;
        let end;
        if (maxPage <= 2 * eachSide + 5) {
            start = 1;
            end = maxPage;
        } else if (page <= eachSide + 3) {
            start = 1;
            end = eachSide * 2 + 3;
        } else if (page >= maxPage - (eachSide + 2)) {
            start = maxPage - 2 * eachSide - 2;
            end = maxPage;
        } else {
            start = page - eachSide;
            end = page + eachSide;
        }
        const arr = [];
        if (start > 1) {
            arr.push("1");
        }
        if (start > 2) {
            arr.push("...");
        }
        for (let i = start; i < end + 1; i++) {
            arr.push(i);
        }
        if (end < maxPage - 1) {
            arr.push("...");
        }
        if (end < maxPage) {
            arr.push(maxPage);
        }

        return arr;
    };

    console.log(paginationArr(7, 2, page));

    res.render("index.ejs", { dataUser: rs[0], page: page || 1, maxPage });
};

export const upload = (req, res) => {
    res.render("upload.ejs");
};
