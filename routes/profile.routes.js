const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");


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
  const { username, email, userPic, country, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json("The profile was not found");
  }
  try {
    const updatedProject = await User.findByIdAndUpdate(id, {
      username,
      email,
      userPic,
      country,
      password,
    });

    res.json(updatedProject);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
