let express = require('express')
let Hotel = require('../models/hotel')
let { isLoggedIn, isHotelAuthor } = require('../middlewares/index')
const router = express.Router();

router.get('/', (req, res) => {
    res.render("Landing")
})

router.get('/hotels', async (req, res) => {
    try {
        let hotels = await Hotel.find({})
        res.render('hotels/index', { hotels })
    } catch (error) {
        req.flash('error', 'error while fetching hotels, please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.get('/hotels/new', isLoggedIn, (req, res) => {
    res.render('hotels/new')
})

router.post('/hotels', isLoggedIn, async (req, res) => {
    try {
        let hotel = new Hotel(req.body.hotel)
        hotel.author = req.user._id;
        await hotel.save();
        req.flash('success', 'Hotel Successfully created')
        res.redirect(`/hotels/${hotel._id}`)
    } catch (error) {
        req.flash('error', 'error while creating hotels, please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.get('/hotels/:id', async (req, res) => {
    try {
        let hotel = await Hotel.findById(req.params.id)
            .populate({
                path: 'author'
            })
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            })
        // .populate('some-property')
        // .populate({
        // path: 'some-property'
        // populate: {
        // path: 'some-property'
        // }
        // })
        res.render('hotels/show', { hotel })
    } catch (error) {
        req.flash('error', 'error while get hotels please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.get('/hotels/:id/edit', isLoggedIn, isHotelAuthor, async (req, res) => {
    try {
        let hotel = await Hotel.findById(req.params.id)
        res.render('hotels/edit', { hotel })
    } catch (error) {
        req.flash('error', 'error while edit hotels please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.patch('/hotels/:id', isLoggedIn, isHotelAuthor, async (req, res) => {
    try {
        await Hotel.findByIdAndUpdate(req.params.id, req.body.hotel)
        req.flash('success', 'Hotel Successfully updated')
        res.redirect(`/hotels/${req.params.id}`)
    } catch (error) {
        req.flash('error', 'error while edit hotels please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/hotels/:id', isLoggedIn, isHotelAuthor, async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        req.flash('success', 'Hotel Successfully deleted')
        res.redirect('/hotels')
    } catch (error) {
        req.flash('error', 'error while delete hotel please try again later')
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router;