const { Genre } = require('../models/genre');
const { Movie, validate } = require("../models/movie");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    const result = await Movie.find().sort("name");
    if (result.length == 0) return res.status(404).send("There is no record");
    res.send(result);
    console.log(result);
})


router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("The following id not found")
    let movies = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        dailyRentalRate: req.body.dailyRentalRate,
        numberInStock: req.body.numberInStock
    })
    movies = await movies.save();
    console.log(movies);
    res.send(movies);
})

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("The following id not found");
    const movies = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        dailyRentalRate: req.body.dailyRentalRate,
        numberInStock: req.body.numberInStock
    }, { new: true })
    if (!movies) return res.status(404).send("The following movie not found");
    console.log(movies);
    res.send(movies);
})


router.delete("/:id", async (req, res) => {
    const result = await Movie.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send("The following movie not found");
    res.send(result);
    console.log(result);
})


module.exports = router;