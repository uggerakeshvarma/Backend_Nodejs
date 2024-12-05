const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({

    FirmName: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true  
    },
    catagory: {  
        type: [
            {
                type: String,
                enum: ['veg', 'Non-veg']
            }
        ]

    },
    Region: {
        type: [
            {
                type: String,
                anum: ["SothIndia ", 'NortIndia', 'Chineis', 'Bakery']

            }
        ]
    },

    Offer: {
        type: String
    },
    Image: {
        type: String
    },   

    vender: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        }
    ],
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ] 

})

const Firm = mongoose.model('Firm', FormSchema)

module.exports = Firm 