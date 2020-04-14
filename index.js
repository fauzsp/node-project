// const config = require("config");
const winston = require("winston");
require("winston-mongodb");
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
require("./startup/routes")(app);



winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtExceptions.log" }))

process.on("unhandledRejection", (ex) => {
    throw ex;
})



winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/movierental",
    level: "info"
})


if (!process.env.JWT_KEY) {
    console.error("FATAL ERROR: Jwt Private Key is not defined");
    process.exit(1);
}

mongoose.connect('mongodb://localhost/movierental')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Failed to connect the database MongoDB...'));




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));