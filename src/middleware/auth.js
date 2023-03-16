const auth = (req, res, next) => {
    console.log("middleware");
    next();
};

export default auth;
