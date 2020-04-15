require("dotenv").config();


module.exports = function () {
    if (!process.env.JWT_KEY) {
        throw new Error("FATAL ERROR: Jwt Private Key is not defined");
    }
}
