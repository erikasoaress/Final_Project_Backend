const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");


router.get("/profile/:id", async (req, res, next) => {
  
  const { id } = req.params;
  try {
    const profile = await User.findById(id).populate("favoriteRadios");
    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});

router.put("/profile/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  console.log(id, name, email);

  try {
    const updatedProfile = await User.findByIdAndUpdate(id, {
      name,
      email,
    }, {new:true});
    console.log(updatedProfile)
           const { _id, email, name } = updatedProfile;

           // Create an object that will be set as the token payload
           const payload = { _id, email, name };

           // Create a JSON Web Token and sign it
           const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
             algorithm: "HS256",
             expiresIn: "6h",
           });

           console.log(authToken)

           // Send the token as the response
           res.status(200).json({ authToken: authToken });

  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
