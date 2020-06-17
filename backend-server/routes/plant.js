
const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");

const User = require("../models/user_model");


router.get("/planttest", async (req, res) => {
    try {


        res.send({ message: "plant test" });

    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

module.exports = router;
 