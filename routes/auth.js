const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'You need to pass a username'],
        unique: true,
        trim: true
    },
    image: {
        type: String
    }
})

const User = mongoose.model('user',userSchema);
module.exports = User