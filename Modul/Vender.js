const mongoose = require('mongoose');
const VenderSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    firm: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }
    ] 



})
const Vender = mongoose.model('Vender', VenderSchema)
module.exports = Vender;