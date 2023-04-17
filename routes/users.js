const express = require('express'),
    {isLoggedIn} = require('../middlewares/index')
const router = express.Router();
const User = require('../models/user')

router.get('/users/:id',isLoggedIn,async (req,res)=>{
    try {
        let user = await User.findById(req.params.id)
        res.render('users/show',{user})
    } catch (error) {
        req.flash('error','error while fetching user, please try again later');
        console.log(error)
        res.redirect('/hotels')
    }
});

router.get('/users/:id/edit', async (req,res)=>{
    try {
        let user = await User.findById(req.user._id)
        res.render('users/edit',{user})
    } catch (error) {
        req.flash('error','error while editing user, please try again later');
        console.log(error)
        res.redirect('/hotels')
    }
});

router.patch('/users/:id', async (req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id,req.body.user)
        req.flash('success', 'User update done')
        res.redirect(`/users/${req.params.id}`)
    } catch (error) {
        req.flash('error','error while editing user, please try again later');
        console.log(error)
        res.redirect(`/users/${req.params.id}`)
    }
})

// routes for user home page
router.get('/user/user-page',(req,res)=>{
    res.render('../views/users/user-page.ejs')
})

module.exports = router;