const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  author: {
     type: Schema.Types.ObjectId, ref: "User" },
  comment: { 
    type: String },
  likes: [{
     type: Schema.Types.ObjectId, ref: "User" }],
  },
{
    timestamps: true
});

const Review = model("Review", reviewSchema);

module.exports = Review;





