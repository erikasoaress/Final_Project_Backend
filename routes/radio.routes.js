const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
const Radio = require("../models/Radio.model");

const API_URL = "http://de1.api.radio-browser.info/json";

router.get("/radios/country/:country", async (req, res, next) => {
  try {
    const { country } = req.params;

    const countryUrl = `${API_URL}/stations/bycountry/${country}`;

    const response = await axios.get(countryUrl, {
      params: {
        countrycode: country,
      },
    });

    console.log(req);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

router.get("/radios/genre/:genre", async (req, res, next) => {
  try {
    const { genre } = req.params;
    const genreUrl = `${API_URL}/stations/bytag/${genre}?limit=500`;

    const response = await axios.get(genreUrl);

    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

router.get("/radios/ranked", async (req, res, next) => {
  try {
    const voteUrl = `${API_URL}/stations/topvote?limit=50`;

    const response = await axios.get(voteUrl);

    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

router.get("/radio/all-stations", async (req, res, next) => {
  try {
    const radios = await Radio.find();

    if (radios.length == 0) {
      const response = await axios.get(
        "http://de1.api.radio-browser.info/json/stations?limit=50"
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
      res.json(response.data);
    } else {
      res.json(radios);
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/radios", async (req, res, next) => {
  try {
    const { name, img, country, genre, ranking } = req.body;

    const foundRadio = await Radio.findOne({ name });

    if (!foundRadio) {
      const newRadio = await Radio.create({
        name,
        img,
        country,
        genre,
        ranking,
      });
      res.json(newRadio);
    } else {
      res.json(foundRadio);
    }
  } catch (error) {
    res.json(error);
  }
});

router.get("/radios/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundRadio = await Radio.findById(id);

    res.json(foundRadio);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
