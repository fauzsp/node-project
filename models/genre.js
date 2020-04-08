const mongoose = require("mongoose");
const Joi = require("Joi");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
})

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(main) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(main, schema);
}

exports.genreSchema = genreSchema;
exports.validate = validateGenre;
exports.Genre = Genre;
