const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
    },
    isAdmin: {
        type: Boolean
    }
})

userSchema.methods.generateAuth = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_KEY);
    return token;
}

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