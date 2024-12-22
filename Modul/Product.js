const mongoose = require('mongoose')
const express = require('express')

const ProductSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    catagory: {
        type: [
            {
                type: String,
                enum: ["Veg", "Non-Veg"]
            }
        ]
    },
    Image: {
        type: String

    },

    bestSeller: {
        type: Boolean,  
        required: true,
      },
    disciption: {
        typr: String
    },
    firm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm"

    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product