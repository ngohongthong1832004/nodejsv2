import connection from "../configs/connectDB";

export const getHomeData = (req, res) => {
    // Logic

    connection.query(
        "SELECT * FROM `users`",
        async function (err, results, fields) {
            const dataUser = await [...results.map((row) => row)];
            const rs = await res.render("index.ejs", {
                dataUser,
            });
        }
    );
};
