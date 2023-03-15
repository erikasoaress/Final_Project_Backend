const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Radio = require("../models/Radio.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");



router.put("/favorites/:radioId/:userId", async (req, res) => {
  const { radioId, userId } = req.params;
  /* const userId = req.payload._id; */

  try {
/*     console.log(radioId); */
    const user = await User.findById(userId);
/*     console.log(user) */
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
/*     console.log(user); */

    /* const radioDetail = await Radio.findById(radioId); */
/*     console.log(radioDetail); */
    const myUpdatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          favoriteRadios: radioId,
        },
      },
      { new: true }
    );
    console.log(myUpdatedUser);

    res.status(201).json(myUpdatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;