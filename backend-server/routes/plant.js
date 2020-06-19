
const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();



const auth = require("./../middleware/auth");

const User = require("../models/user_model");


const axios = require('axios');


const keywords = [
  

]


router.get("/getplant", async (req, res) => {
  try {

    var plantName = req.query.plantname
    var plantProblem = req.query.plantproblem





    const response = await axios.get('http://www.reddit.com/r/plantclinic/search.json?restrict_sr=on&q=' + plantName + " " + plantProblem)
    
    var children = response.data.data.children

    var max = 5
    if(children.length < max){
      max = children.length
    }


    /**
     * stores the raw comments, upvote count and link
     */
    var commentsUnParsed = []

  

    for(i = 0; i < max; i++){

      var name = children[i].data.name;
      var imageurl = children[i].data.url

      /**
       * gets reddit name id
       */
      var trueName = name.split("_")

    

      /**
       * retrieves comments json from reddit
       */
      const name_response = await axios.get('https://www.reddit.com/comments/'+ trueName[1] +'/.json')

      /**
       * retrieves comments from each post
       */
      var commentBody = name_response.data[1].data.children

      /**
       * parse comments and store them in unparsed
       */
      
      var postCommentsPackage = []
      for(j = 0; j<commentBody.length; j++){
        var comment = commentBody[j].data.body
        var ups  = commentBody[j].data.ups
        var permalink = commentBody[j].data.permalink
        console.log(comment);
        postCommentsPackage.push({
          'comment' : comment,
          'upvotes': ups,
          'link': permalink })
      }
      commentsUnParsed.push({
        'imageurl' : imageurl,
        'comments' : postCommentsPackage
      })


    }










    res.json(commentsUnParsed)

  } catch (e) {
    res.send(e);
  }
});




router.get("/planttest", async (req, res) => {
    try {


        res.send({ message: "plant test" });

    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

module.exports = router;
 