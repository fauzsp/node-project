const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("Joi");
const { User } = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
    const result = await User.find();
    res.send(result);
    console.log(result);
})


router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid username or password");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid username or password");

    const token = user.generateAuth();

    res.send(token);
    console.log(token);
});

function validate(main) {
    const schema = {
        email: Joi.string().min(3).max(150).required().email(),
        password: Joi.string().min(3).max(150).required()
    };

    return Joi.validate(main, schema);
}


module.exports = router;