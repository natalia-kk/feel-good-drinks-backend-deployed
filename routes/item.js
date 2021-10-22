// ITEM ROUTES 
// used for cart, checkout and orders

const express = require("express")
const router = express.Router()
const Item = require('./../models/Item')
const path = require('path')

// GET - get all products
router.get('/', (req, res) => {

    // get all products from the Item model (so all items in the MongoDB item collection) using the find() method
    Item.find()
        // if successful will return json object containing list of all items
        .then((items) => {
            res.json(items)
        })
        // runs when there's an error
        // print error message + info in error object in console log
        .catch((err) => {
            console.log("problem getting items", err)
        })
})

// GET - get single product item
router.get('/:id', (req, res) => {
    // use the Item model to find one item by id - search the database for that item
    Item.findById(req.params.id)
        .then((item) => {
            // check if item with that id exists
            // if it's false/ not found, send status code + json mesage
            if(!item) {
                res.status(400).json({
                    message: "Product item doesn't exist"
                })
            // now normal json response will only run if product object is found successfully
            }else{
                res.json(item)
            }
        })
        .catch((err) => {
            console.log("Error getting product item", err)
                res.status(500).json({ // error response sent to user
                    message: "Problem getting product item",
                    error: err
            })
        })
})

// EXPORT the router object 
// (imported in server.js in 'ROUTES' section)
module.exports = router