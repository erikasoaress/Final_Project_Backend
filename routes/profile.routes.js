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
    console.log("insode tryyyyt");
    const updatedProfile = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true }
    );
    console.log("______Here");
    res.json(updatedProfile)
    
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
