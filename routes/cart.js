// CART ROUTES

// express has it's own router we can use. Store in variable 'router'
const express = require("express")
const router = express.Router()
const Cart = require('./../models/Cart')
const Item = require('./../models/Item') 
const path = require('path')

// GET - get cart
router.get('/', (req, res) => {
    // check if cart is set already (in session store)
        if (!req.session.cart) {
            return res.status(400).json({
                message: "Your cart is empty"
            })
        }
        // cart exists:
        var cart = new Cart(req.session.cart); // create a new cart off the one stored in the session
        // if cart is empty:
        if(cart.totalQty === 0) {
            return res.status(400).json({
                message: "Your cart is empty"
            })
        }
        res.json(cart);
});

// GET - get cart items as an array
router.get('/items', (req, res) => {
    // check if cart is set already (in session store)
        if (!req.session.cart) {
            return res.status(400).json({
                message: "Your cart is empty"
            })
        }
        // cart exists:
        var cart = new Cart(req.session.cart); // create a new cart off the one stored in the session
        // create an array of the items in the cart
        res.json(cart.generateArray());
});

// GET - add a product to cart (store in user session - will be stored in a cart object)
router.get('/:id', (req, res) => {

    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Item.findById(productId)
    .then((product) => {
        // check if product with that id exists
        // if it's false/product not found, send status code + json mesage
        if(!product) {
            res.status(400).json({
                message: "Problem adding product to your cart"
            })
        // now normal json response will only run if product object is found successfully
        }else{
            cart.add(product, product.id); // add function defined in Cart model
            req.session.cart = cart; // store in cart object in session (express-session saves it automatically)
            res.status(200).json(cart);
        }
    })
    .catch((err) => {
        console.log("Problem adding product to your cart", err)
            res.status(500).json({ // error response sent to user
                message: "Problem adding product to your cart",
                error: err
        })
    })
});

// DELETE - clear cart
router.delete('/remove', (req, res) => {
    // check if cart is set already (in session store)
    if (!req.session.cart) {
        return res.status(400).json({
            message: "Your cart is empty"
        })
    }
    // cart exists:
    req.session.cart = null; // empty cart
    return res.json({
        message: "You have cleared you cart"
    })
});

// DELETE - remove an item from cart by id
router.delete('/remove/:id', (req, res) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId); // removeItem function defined in Cart model
    req.session.cart = cart;
    console.log("Item removed from cart")
    // if cart is empty:
    if(cart.totalQty === 0) {
        return res.status(400).json({
            message: "Your cart is empty"
        })
    }else{
        res.json(cart);
    }
});

// EXPORT the router object 
// (imported in server.js in 'ROUTES' section)
module.exports = router