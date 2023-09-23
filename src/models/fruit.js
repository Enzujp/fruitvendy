const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
    // get properties from website for fruit schema
    _id : mongoose.Schema.Types.ObjectId,

    genus: {
        type: String,
        required: true 
    }, 
    name: {
        type: String,
        required: true
    },
    fruitId: {
        type: Number,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true
    },
    nutritions: {
        carbohydrates: {
            type: Number,
            required: true
        },
        protein: {
            type: Number,
            required: true
        },
        fat: {
            type: Number,
            required: true
        },
        calories: {
            type: Number,
            required: true
        },
        sugar: {
            type: Number,
            required: true
        }
    }
})

module.exports = mongoose.model('Fruit', fruitSchema);