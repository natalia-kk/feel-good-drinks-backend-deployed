// MESSAGE SCHEMA and MODEL (for contact form data)
// (note from Natalia) - attachment upload should upload the file to the server, but I couldn't get this to work.

const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email') // required for email
const Utils = require('./../utils') // required for file (image) upload

// schema
const messageSchema = new mongoose.Schema({
    
    // contains required fields
    fullName: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true    
    },
    phone: {
        type: String, 
    },
    message: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
    }
})

// create model
const messageModel = mongoose.model('Message', messageSchema)

// export model
module.exports = messageModel 