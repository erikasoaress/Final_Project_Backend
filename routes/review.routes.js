const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
 const { isAuthenticated } = require("../middleware/jwt.middleware.js");
 const Review = require ('../models/Review.model')
 const Radio = require ('../models/Radio.model')



router.post("/review", async (req, res) => {
    try {
    const { comment,radioId, userId } = req.body;

    const newReview = await Review.create({ comment, author: userId });

    await Radio.findByIdAndUpdate(radioId, {$push: {reviews: newReview._id}})
    res.json(newReview)

    } catch (error) {
        console.log(error)
    }

});



module.exports = router;