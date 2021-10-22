// ORDER ROUTE 

const express = require("express")
const router = express.Router()
const Order = require('./../models/Order')
const path = require('path')

// GET - get all orders
router.get('/', (req, res) => {

    // get all orders from the Order model (so all products in the MongoDB order collection) using the find() method
    Order.find()
        // if successful will return json object containing list of all orders
        .then((orders) => {
            res.json(orders)
        })
        // runs when there's an error
        // print error message + info in error object in console log
        .catch((err) => {
            console.log("Problem retrieving orders", err)
        })
})

// GET - get a single order by id
router.get('/:id', (req, res) => {
    // use the order model to find one order by id - search the database for that order
    Order.findById(req.params.id)
        .then((order) => {
            // check if order with that id exists
            // if it's false/order not found, send status code + json mesage
            if(!order) {
                res.status(400).json({
                    message: "This order doesn't exist"
                })
            // now normal json response will only run if product object is found successfully
            }else{
                res.json(order)
            }
        })
        .catch((err) => {
            console.log("Error retrieving this order", err)
                res.status(500).json({ // error response sent to user
                    message: "Problem retrieving this order",
                    error: err
            })
        })
})

// EXPORT the router object 
// (imported in server.js in 'ROUTES' section)
module.exports = router