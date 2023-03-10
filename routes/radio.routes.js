const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");

const API_URL = 'http://de1.api.radio-browser.info/json'

router.get("/country", async (req, res, next) => {
  try {
    const {country} = req.query;
    
    const countryUrl= `${API_URL}/stations/search`;

    const response = await axios.get(countryUrl, {
      params: {
        countrycode: country,
      }
    });

    console.log(req)
    res.json(response.data);

  } catch (error) {
    res.json(error);
  }
});

router.get("/genre", async (req, res, next) => {
  try {
    const { tags } = req.query;
    const genreUrl = `${API_URL}/tags/${tags}?limit=1000`;

    const response = await axios.get(
      genreUrl
    );

    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

router.get("/ranked", async (req, res, next) => {

  try {

    const voteUrl = `${API_URL}/stations/topvote?limit=100`;

    const response = await axios.get(voteUrl);

    res.json(response.data);

  } catch (error) {
    res.json(error);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const radioByIdUrl = `${API_URL}/stations/byuuid`;

    const response = await axios.get(radioByIdUrl, {
      params: {
        uuids: id
      }
    });

    res.json(response.data)

  } catch (error) {
    res.json(error);
  }
});

router.get("/allStations", async (req, res, next) => {
  try {
    const radios = Radio.find();
    if (!radios.length) {
      const response = await axios.get(
        "http://de1.api.radio-browser.info/json/stations?limit=10"
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
