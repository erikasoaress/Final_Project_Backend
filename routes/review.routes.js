const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
 const { isAuthenticated } = require("../middleware/jwt.middleware.js");
 const Review = require ('../models/Review.model')
 const Radio = require ('../models/Radio.model')



router.post("/review", isAuthenticated, async (req, res) => {
    try {
    const { comment,radioId } = req.body;
    const {_id} = req.payload;

    const newReview = await Review.create({comment, author: _id})

    await Radio.findByIdAndUpdate(radioId, {$push: {reviews: newReview._id}})
    res.json(newReview)

    } catch (error) {
        console.log(error)
    }

});



module.exports = router;