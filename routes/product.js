// PRODUCT ROUTES

const express = require("express")
const router = express.Router()
const Product = require('./../models/Product')
const path = require('path')

// GET - get all products
router.get('/', (req, res) => {

    // get all products from the Product model (so all products in the MongoDB product collection) using the find() method
    Product.find()
        // if successful will return json object containing list of all products (products)
        .then((products) => {
            res.json(products)
        })
        // runs when there's an error
        // print error message + info in error object in console log
        .catch((err) => {
            console.log("Problem getting products", err)
        })
})

// GET - get single product
router.get('/:id', (req, res) => {
    // use the Product model to find one product by id - search the database for that product
    Product.findById(req.params.id)
        .then((product) => {
            // check if product with that id exists
            // if it's false/product not found, send status code + json mesage
            if(!product) {
                res.status(400).json({
                    message: "Product doesn't exist"
                })
            // now normal json response will only run if product object is found successfully
            }else{
                res.json(product)
            }
        })
        .catch((err) => {
            console.log("Error getting product", err)
                res.status(500).json({ // error response sent to user
                    message: "Problem getting product",
                    error: err
            })
        })
})

// EXPORT the router object 
// (imported in server.js in 'ROUTES' section)
module.exports = router