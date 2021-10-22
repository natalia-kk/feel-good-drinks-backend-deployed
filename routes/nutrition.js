// Nutrition ROUTES

const express = require("express")
const router = express.Router()
const Nutrition = require('./../models/Nutrition')
const path = require('path')

// GET - get all nutrition information documents
router.get('/', (req, res) => {
        
  // get all nutrition information docs from the Nutrition model using the find() method
  Nutrition.find()
      // if successful will return json object containing list of all messages (messages)
      .then((nutritions) => {
          res.json(nutritions)
      })
      // runs when there's an error
      // print error message + info in error object in console log
      .catch((err) => {
          console.log("problem getting nutrition information", err)
      })
})

// GET - get single nutrition doc
router.get('/:id', (req, res) => {
    // use the Nutrition model to find one doc by id
    Nutrition.findById(req.params.id)
        .then((nutrition) => {
            // check if nutrition doc with that id exists
            // if it's false/not found, send status code + json mesage
            if(!nutrition) {
                res.status(400).json({
                    message: "nutrition information document doesn't exist"
                })
            // now normal json response will only run if nutrition object is found successfully
            }else{
                res.json(nutrition)
            }
        })
        .catch((err) => {
            console.log("error getting nutritional information", err)
                res.status(500).json({ // error response sent to user
                    message: "problem getting nutritional information",
                    error: err
            })
        })
    })

// EXPORT the router object 
// (imported in server.js in 'ROUTES' section)
module.exports = router