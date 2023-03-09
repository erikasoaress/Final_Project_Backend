const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/country", async (req, res, next) => {
  try {
    const { radio } = Radio.find;
  } catch (error) {
    res.json(error);
  }
});

router.get("/genre", async (req, res, next) => {
  try {
  } catch (error) {
    res.json(error);
  }
});

router.get("/ranked", async (req, res, next) => {
  try {
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    res.json(error);
  }
});

router.get("/allStations", async (req, res, next) => {
  try {
    const radios = Radio.find();
    if (!radios.length) {
      const response = await axios.get(
        "http://de1.api.radio-browser.info/json/stations?limit=1000"
      );

      await response.data.map((radio) => {
        Radio.create({
          name: radio.name,
          img: radio.favicon,
          genre: radio.tags,
          country: radio.country,
          ranking: radio.votes,
        });
      });
    }

    
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
