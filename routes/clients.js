const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Client, validate, clientAuth } = require("../models/client");


router.get("/", async (req, res, next) => {
    try {
        const result = await Client.find().sort({ name: 1, date: -1 }).select("name date -_id");
        if (!result || result.length == 0) return res.status(404).send("Sorry, No clients record found");
        res.send(result);
        console.log(result.length);
    }
    catch (ex) {
        next(ex);
    }
})

router.get("/logout", async (req, res, next) => {
    const token = await req.header("x-auth-token");
    if (!token) return res.status(401).send("Access Denied");
    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const result = decode;
        const client = await Client.findOne({ email: result.email }, function (err, client) {
            client.clientToken = '';
            client.save();
        }).select("email name");
        await client.save();
        res.send(_.pick(client, ["email", "name"]));
        console.log(_.pick(client, ["email", "name"]));
    }
    catch (ex) {
        next(ex);
    }
})




router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const checkClient = await Client.findOne({ email: req.body.email });
    if (checkClient) return res.status(400).send("User already exists");
    // const token = clientAuth(req.body);
    const token = jwt.sign({ email: req.body.email, name: req.body.name }, process.env.JWT_KEY);
    const client = new Client({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        clientToken: token
    });
    const salt = await bcrypt.genSalt(10);
    client.password = await bcrypt.hash(client.password, salt);
    await client.save();
    res.send(_.pick(client, ["name", "email", "clientToken", "date"]));
    console.log(client);
})


module.exports = router;