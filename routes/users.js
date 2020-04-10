const express = require("express");
require("dotenv").config();
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const router = express.Router();



router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -_id");
    res.send(user);
})

// router.get("/logout", auth, async (req, res) => {
//     let token = req.header("x-auth-token");
//     const result = "";
//     token = result;
//     res.send(token);
// })


router.get("/", async (req, res) => {
    const result = await User.find();
    res.send(result);
    console.log(result);
})


router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("This user already exists");
    user = new User(_.pick(req.body, ["name", "email", "password"]))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuth();
    res.header("x-auth-token", token).send((_.pick(req.body, ["id", "name", "email"])))
    console.log(user);
});




module.exports = router;