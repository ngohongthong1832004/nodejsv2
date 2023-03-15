export const getHomeData = async (req, res) => {
    const page = req.query.page;
    // create the connection

    const mysql = require("mysql2/promise");
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
        if (page <= eachSide) {
            start = 1;
            end = eachSide + 1;
        } else if (page >= maxPage - eachSide + 2) {
            start = maxPage - eachSide;
            end = maxPage;
        } else {
            start = page - eachSide + 1;
            end = page + eachSide - 1;
        }
        const arr = [];
        if (start > 1) {
            arr.push(1);
        }
        if (start > 2) {
            arr.push("...");
        }
        for (let i = start; i <= end; i++) {
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

    const pagination = paginationArr(
        Number(maxPage) || 7,
        2,
        Number(page) || 1
    );

    res.render("index.ejs", {
        dataUser: rs[0],
        page: page || 1,
        maxPage,
        pagination,
    });
};

export const upload = (req, res) => {
    res.render("upload.ejs");
};
export const search = async (req, res) => {
    const searchValue = req.body.search;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "nodejsbasic",
    });
    const rs = await connection.execute(
        `SELECT * from users where last_name LIKE '%${searchValue}%'`
    );

    res.render("search.ejs", {
        dataUser: rs[0],
        searchValue,
    });
};
