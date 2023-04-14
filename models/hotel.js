const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

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
        min: [100, 'Hotels rooms must be atLeast 100rs'],
        max: 10000
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    images: [{
        url: String,
        filename: String
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
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
    ],
    geometry :{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    upVotes: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    downVotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
})

hotelSchema.plugin(mongoosePaginate)
const Hotel = mongoose.model('hotel', hotelSchema);
module.exports = Hotel