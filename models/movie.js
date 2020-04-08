const mongoose = require("mongoose");
const genreSchema = require("./genre");
const Joi = require("Joi");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 100,
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 100,
    }
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(main) {
    const schema = {
        title: Joi.string().required().min(3).max(100),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(main, schema);
}

exports.validate = validateMovie;
exports.Movie = Movie;
