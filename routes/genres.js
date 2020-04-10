const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/async");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();


router.get("/", asyncMiddleware(async (req, res) => {
    throw new Error("Could not get the genres.");
    const genres = await Genre.find();
    if (!genres) return res.status(404).send("No genres found");
    res.send(genres);
    console.log(genres);
}));

router.post("/", auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
}));

router.put("/:id", auth, asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    console.log(genre);
    res.send(genre);
}));


router.delete("/:id", [auth, admin], asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
    console.log(genre);
}));

router.get("/:id", auth, asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id).select("name -_id");
    if (!genre) return res.status(404).send("The following id not found");
    res.send(genre);
}));

module.exports = router;