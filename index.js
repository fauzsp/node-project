// const config = require("config");
require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const movies = require("./routes/movies");
const genres = require("./routes/genres");
const auth = require("./routes/auth");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const customers = require('./routes/customers');
const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));