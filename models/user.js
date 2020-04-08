const mongoose = require("mongoose");
const Joi = require("Joi");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 150,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1000
    }
})

const User = mongoose.model("User", userSchema);

function validateUser(main) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(150).required().email(),
        password: Joi.string().min(3).max(150).required()
    };

    return Joi.validate(main, schema);
}

exports.User = User;
exports.validate = validateUser;