// const config = require("config");
const winston = require("winston");
require("winston-mongodb");
const mongoose = require('mongoose');
const express = require('express');
const movies = require("./routes/movies");
const genres = require("./routes/genres");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const customers = require('./routes/customers');
require("dotenv").config();
const app = express();

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/movierental",
    level: "info"
})

process.on("uncaughtException", (ex) => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION");
    winston.error(ex.message, ex);
    process.exit(1);
})

process.on("unhandledRejection", (ex) => {
    console.log("WE GOT AN UNHANDLED REJECTION");
    winston.error(ex.message, ex);
    process.exit(1);
})

if (!process.env.JWT_KEY) {
    console.error("FATAL ERROR: Jwt Private Key is not defined");
    process.exit(1);
}

mongoose.connect('mongodb://localhost/movierental')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Failed to connect the database MongoDB...'));

app.use(express.json());
app.use("/api/genres", genres);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use("/api/movies", movies);

app.use(error);

// const p = Promise.reject(new Error("Something failed in Promise"))
// p.then(() => { console.log("done") })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));