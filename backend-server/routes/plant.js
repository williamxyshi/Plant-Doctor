
const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();



const auth = require("./../middleware/auth");

const User = require("../models/user_model");


const axios = require('axios');

var natural = require('natural');
var classifier = new natural.LogisticRegressionClassifier();

train()



router.get("/getplant", async (req, res) => {
  try {

    var plantName = req.query.plantname
    var plantProblem = req.query.plantproblem



    console.log(plantName + plantProblem)

    const response = await axios.get('http://www.reddit.com/r/plantclinic/search.json?restrict_sr=on&t=all&sort=relevance&q=' + plantName + " " + plantProblem)
    
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

        // classifier.addDocument(['overwater', 'too much water'], 'overwatered');
        // classifier.addDocument(['too much light', 'too bright light', 'too bright'], 'too bright light');
        // classifier.addDocument(['burned', 'too bright light', 'direct light', 'direct sunlight'], 'direct light');
        


        var classes = classifier.getClassifications(comment)

        var commenttags = []

        // console.log(' ')
        // console.log(comment)
        for(k = 0; k<classes.length; k++){
          // console.log(classes[k].label + classes[k].value)

          if(classes[k].value > 0.90){
            commenttags.push(classes[k].label)
          }



        }

        /**
         * should we include comments that return nothing from the parser??
         */
        // if(commenttags.length == 0){
        //   commenttags.push("cannot tell")
        // }
    
        




        var ups  = commentBody[j].data.ups
        var permalink = commentBody[j].data.permalink
       
        postCommentsPackage.push({
          'comment' : comment,
          'upvotes': ups,
          'tags' : commenttags,
          'link': permalink })
      }
      commentsUnParsed.push({
        'imageurl' : imageurl,
        'comments' : postCommentsPackage,
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

  function train(){

    classifier.addDocument('overwater', 'overwatered');
    classifier.addDocument('too much water', 'overwatered');
    classifier.addDocument('less water', 'overwatered');

    classifier.addDocument('too dry', 'more water');
    classifier.addDocument('more water', 'more water');
    classifier.addDocument('underwater', 'more water');


    classifier.addDocument('need nutrients', 'fertilize');
    classifier.addDocument('more nutrients', 'fertilize');

    classifier.addDocument('inconsistent watering', 'inconsistent watering');

    classifier.addDocument('drainage', 'soil too wet');
    classifier.addDocument('let soil dry', 'soil too wet');
    classifier.addDocument('root rot', 'soil too wet');
    classifier.addDocument('soil too wet', 'soil too wet');

    classifier.addDocument('sunburn', 'less direct sunlight');
    classifier.addDocument('direct sun burn', 'less direct light');

    classifier.addDocument('excess of sunlight', 'less bright light');
    classifier.addDocument('too bright', 'less bright light');
    classifier.addDocument('too much light', 'less bright light');

    classifier.addDocument('not enough light', 'brighter light');

    classifier.addDocument('fungus', 'fungus');

    classifier.addDocument('humidity', 'humidity');

    classifier.addDocument('bind', 'repot');
    classifier.addDocument('new pot', 'repot');
    classifier.addDocument('root bound', 'repot');
    classifier.addDocument('constricted', 'repot');
    classifier.addDocument('repot', 'repot');

    classifier.addDocument('bug', 'pests');
    classifier.addDocument('insect', 'pests');
    classifier.addDocument('pest', 'pests');
    classifier.addDocument('infest', 'pests');


    classifier.addDocument("normal", 'normal');

    classifier.train()
  }

module.exports = router;
 