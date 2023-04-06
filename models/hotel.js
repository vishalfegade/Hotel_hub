const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isRoomAvailable: {
        type: Boolean,
        default: true,
        min: [100,'Hotels rooms must be atLeast 100rs'],
        max: 10000
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    overAllRating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review'
        }
    ]
})

const Hotel = mongoose.model('hotel',hotelSchema);
module.exports = Hotel