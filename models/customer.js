const mongoose = require("mongoose");
const Joi = require("Joi");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    isGold: {
        default: false,
        type: Boolean
    },
    phone: {
        type: Number,
        required: true,
        minlength: 8,
        maxlength: 20
    }
})

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(main) {
    const schema = {
        name: Joi.string().required().min(2).max(100).required(),
        isGold: Joi.boolean(),
        phone: Joi.number().required().min(8).max(20)
    }
    return Joi.validate(main, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;