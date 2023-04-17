const Hotel = require('../models/hotel');
const Review = require('../models/review');

const hotelReviewPost = async (req, res) => {
    try {
        let newReview = new Review(req.body.review);
        newReview.author = req.user;
        await newReview.save();

        let hotel = await Hotel.findById(req.params.id);

        hotel.overAllRating = ((hotel.overAllRating*hotel.reviews.length) + newReview.rating)/(hotel.reviews.length+1)

        hotel.reviews.push(newReview);
        await hotel.save();
        req.flash('success', 'Comment added')
        res.redirect(`/hotels/${req.params.id}`)
    } catch (error) {
        req.flash('error', 'error while creating review, please try again later');
        console.log(error)
        res.redirect(`/hotels/${req.params.id}`)
    }
}

const hotelReviewDelete = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        req.flash('success', 'review deleted')
        res.redirect(`/hotels/${req.params.id}`)
    } catch (error) {
        req.flash('error', 'error while deleting review, please try again later');
        console.log(error)
        res.redirect(`/hotels/${req.params.id}`)
    }
}

module.exports = {
    hotelReviewPost,
    hotelReviewDelete
}