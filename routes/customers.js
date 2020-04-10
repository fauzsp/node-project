const express = require("express");
const { Customer, validate } = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
    const result = await Customer.find();
    if (result.length == 0) return res.status(404).send("There is no record");
    console.log(result);
    res.send(result);
});

// router.get("/:id", async (req, res) => {
//     const customer = await Customer.find().select("name phone -_id");
//     const list = Object.keys(customer).map(function (key) {
//         return [Number(key), customer[key]];
//     });
//     const result = list[req.params.id];
//     if (!result) return res.send(false);
//     console.log(result);
//     res.send(result);
// });

router.post("/", async (req, res) => {
    const { error } = validate(res.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    console.log(customer);
    res.send(customer);
})

router.put("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true })
    if (!customer) return res.status(404).send("There is no customer");
    res.send(customer)
    console.log(customer);
})

router.delete("/:id", async (req, res) => {
    const result = await Customer.findByIdAndRemove(req.params.id);
    console.log(result);
    res.send(result);
})

router.get("/:id", async (req, res) => {
    const result = await Customer.findById(req.params.id).select("name -_id");
    console.log(result);
    res.send(result);
})


module.exports = router;