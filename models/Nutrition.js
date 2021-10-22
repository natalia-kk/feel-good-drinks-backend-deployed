// NUTRITION SCHEMA and MODEL

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema
const nutritionSchema = new mongoose.Schema({
    
    flavour: {
        type: String,
    },
    energy: [{ //array
        type: String,
    }],
    fat: {
        type: Number,
    },
    carbohydrateTotal: {
        type: Number,
    },
    carbohydrateSugar: [{ 
        type: Number,
    }],
    protein: {
        type: Number,
    },
    salt: {
        type: Number,
    },
    ingredients: {
        type: String,
    }
})

// create model
const nutritionModel = mongoose.model('Nutrition', nutritionSchema)

// export model
module.exports = nutritionModel  