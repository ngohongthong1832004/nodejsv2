import connection from "../configs/connectDB";
import multer from "multer";
import path from "path";

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/tmp/my-uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

// app.post("/stats", upload.single("uploaded_file"), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any
//     console.log(req.file, req.body);
// });

export const upload = (req, res) => {
    res.render("upload.ejs");
};
export const uploadFile = (req, res) => {};
