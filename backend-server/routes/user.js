
const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");

const User = require("../models/user_model");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            // const salt = await bcrypt.genSalt(10);
            // user.password = await bcrypt.hash(password, salt);

            user.password = password;

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail()
    ],
    async (req, res) => {


      console.log("reached here 1" + req)

      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      console.log("reached here 2")
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: "User Does Not Exist"
          });
  
        // const isMatch = await bcrypt.compare(password, user.password);

        /**
         * I'm suspicious on this localecompare function, keep
         * a close eye on it
         */
        const isMatch = password.localeCompare(user.password)
        if (isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });

        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );

  /**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */


router.get("/me", auth, async (req, res) => {
    try {

      // request.user is getting fetched from Middleware after token authentication

      const user = await User.findById(req.user.id);
      res.json(user);

    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

module.exports = router;
