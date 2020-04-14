const Joi = require("Joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    clientToken: {
        type: String,
    }
});

const Client = mongoose.model("Client", clientSchema);

function clientValidate(main) {
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(100).required().email(),
        password: Joi.string().min(3).max(100).required()
    };
    return Joi.validate(main, schema);
}

exports.validate = clientValidate;
exports.Client = Client;