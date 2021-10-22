// ITEM (individual products sold) SCHEMA and MODEL

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema
const itemSchema = new mongoose.Schema({
    
    flavour: {
        type: String,
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        // link to the product Model in the database (allows us to bring in item's full product information details from here if needed)
        ref: 'Product' 
    },
    pack: {
        type: Number,
    },
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    }
})

// create model
const itemModel = mongoose.model('Item', itemSchema)

// export model
module.exports = itemModel 