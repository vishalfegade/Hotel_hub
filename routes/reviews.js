const express = require('express'),
    { isLoggedIn, isReviewAuthor } = require('../middlewares/index'),
    { hotelReviewPost, hotelReviewDelete } = require('../controllers/reviews-controllers');

const router = express.Router();

// index - get all review for a particular hotel - show page

// new - get form to create a new review - show page

// create - create a new review
router.post('/hotels/:id/reviews', isLoggedIn, hotelReviewPost)

// delete
router.delete('/hotels/:id/reviews/:reviewId', isLoggedIn, isReviewAuthor, hotelReviewDelete)

module.exports = router;