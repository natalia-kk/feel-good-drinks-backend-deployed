// ORDER SCHEMA and MODEL

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema
const orderSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userNumber: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    // entire cart object
    cart: {
        type: Object,
        required: true
    },
    // The Stripe payment ID - allows the payment to be connected to it's associated order 
    paymentID: {
        type: String,
        required: true
    }
})

// create model
const orderModel = mongoose.model('Order', orderSchema)

// export model
module.exports = orderModel 