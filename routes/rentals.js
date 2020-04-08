const mongoose = require("mongoose");
const express = require("express");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const { Rental, validate } = require("../models/rental");
const router = express.Router();

router.get("/", async (req, res) => {
    const result = await Rental.find();
    res.send(result);
    console.log(result);
})

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if (!mongoose.Types.ObjectId.isValid(req.body.customerId) || !mongoose.Types.ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send("The ID is not valid")
    }
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send("The following movie not found");
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send("The following customer not found");
    let rentals = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    })
    rentals = await rentals.save();
    movie.numberInStock = -1;
    movie.save();
    res.send(rentals);
    console.log(rentals);
})

module.exports = router;