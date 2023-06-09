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
    const genreUrl = `${API_URL}/stations/bytag/${genre}?limit=400`;

    const response = await axios.get(genreUrl);

    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

router.get("/radios/ranked", async (req, res, next) => {
  try {
    const voteUrl = `${API_URL}/stations/topvote?limit=200`;

    const response = await axios.get(voteUrl);

    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

router.get("/radio/all-stations", async (req, res, next) => {
  try {
      const response = await axios.get(
        "http://de1.api.radio-browser.info/json/stations?limit=1500"
      );
      res.json(response.data);
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

      const response = await axios.get(
        `http://de1.api.radio-browser.info/json/stations/byuuid?uuids=${id}`
      );

      res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

router.get("/apiRadios/:radioName", async (req, res, next) => {
  try {
    const { radioName } = req.params;

    const allRadios = await Radio.find().populate("reviews");
    let foundRadio;

    const search = await allRadios.map((radio) => {
      if (radio.name.includes(radioName)) foundRadio = radio;
    });

    res.json(foundRadio);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;



