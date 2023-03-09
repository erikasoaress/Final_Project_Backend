const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  author: [{
     type: Schema.Types.ObjectId, ref: "User" }],
  comment: { 
    type: String },
  likes: {
    type: [],
  }
}, {
    timestamps: true
});

const Review = model("Review", userSchema);

module.exports = Review;
