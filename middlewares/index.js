const Review = require('../models/review')
const Hotel = require('../models/hotel')

// authentication
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'Please sign in first');
        console.log("you are not logged in");
        res.redirect('/login');
    }
};

// authorization
const isReviewAuthor = async (req, res, next) => {
    let { reviewId } = req.params;
    let review = await Review.findById(reviewId).populate('author');
    if (review.author._id.equals(req.user._id)) {
        next();
    } else {
        req.flash('error', 'you are not permitted to do that')
        res.redirect('back');
    }
}

const isHotelAuthor = async (req, res, next) => {
    let { id } = req.params;
    let hotel = await Hotel.findById(id).populate('author')
    if (hotel.author._id.equals(req.user._id)) {
        next();
    } else {
        req.flash('error', 'you are not permitted to do that')
        res.redirect('back');
    }
}

// exports
module.exports = {
    isLoggedIn,
    isReviewAuthor,
    isHotelAuthor
}