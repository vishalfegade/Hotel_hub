const express = require('express'),
    { isLoggedIn } = require('../middlewares/index');

const router = express.Router();
const Hotel = require('../models/hotel');
const Review = require('../models/review');

// index - get all review for a particular hotel - show page

// new - get form to create a new review - show page

// create - create a new review
router.post('/hotels/:id/reviews',isLoggedIn, async (req,res)=>{
    try {
        let newReview = new Review(req.body.review);
        newReview.author = req.user;
        await newReview.save();
        let hotel = await Hotel.findById(req.params.id);
        hotel.reviews.push(newReview);
        await hotel.save();
        req.flash('success','Comment added')
        res.redirect(`/hotels/${req.params.id}`)
    } catch (error) {
        req.flash('error','error while creating review, please try again later');
        console.log(error)
        res.redirect(`/hotels/${req.params.id}`)
    }
})

// delete
router.delete('/hotels/:id/reviews/:reviewId',isLoggedIn, async (req,res)=>{
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        req.flash('success','review deleted')
        res.redirect(`/hotels/${req.params.id}`)
    } catch (error) {
        req.flash('error','error while deleting review, please try again later');
        console.log(error)
        res.redirect(`/hotels/${req.params.id}`)
    }
})

module.exports = router;