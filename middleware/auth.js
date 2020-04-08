const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
    const token = req.header("x-auth-header");
    if (!token) return res.status(401).send("Access Denied. No token provided");

    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    }
    catch (ex) {
        res.status(400).send("Invalid user")
    }
}