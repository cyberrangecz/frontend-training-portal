module.exports = (req, res, next) => {
    if (
        req.method === "POST" ||
        req.method === "PUT" ||
        req.method === "DELETE" ||
        req.method === "PATCH"
    ) {
        req.method = "GET";
        req.query = req.body;
    }
    next();
};
