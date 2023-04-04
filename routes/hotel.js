let express = require('express')
let Hotel = require('../models/hotel')
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Landing")
})

router.get('/hotels', async(req,res)=>{
    try {
        let hotels = await Hotel.find({})
        res.render('hotels/index',{hotels})
    } catch (error) {
        req.flash('error','error while fetching hotels, please try again later')
        res.redirect('/')
    }
})

module.exports = router;