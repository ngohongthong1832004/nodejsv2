const configViewEngine = (app) => {
    app.set("views engine", "ejs");
    app.set("views", "./src/views");
};

export default configViewEngine;
