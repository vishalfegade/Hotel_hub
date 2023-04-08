
let express = require('express');
const User = require('../models/user');
const passport = require('passport');
let router = express.Router();

router.get('/register', async (req, res) => {
    // register form
    res.render('users/register')
})

router.post('/register', async (req, res) => {
    try {
        let user = new User({
            username: req.body.username
        })
        let registeredUser = await User.register(user, req.body.password)
        req.logIn(registeredUser, (err) => {
            if (err) {
                req.flash('error', 'User registration failed !')
                console.log("error while registering user", err)
                return res.redirect('/register')
            }
            req.flash('success', 'User registered successfully !')
            res.redirect('/hotels')
        })
    } catch (error) {
        req.flash('error', 'User registration failed !')
        console.log("error while registering user", error)
        return res.redirect('/register')
    }
})

router.get('/login', async (req, res) => {
    // login form
    res.render('users/login')
})

router.post("/login", passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), (req, res) => {
    req.flash('success', 'welcome back user')


    // redirect to the original URL or a default URL
    // console.log('req.session.originalUrl', req.session.originalUrl)
    const redirectTo = req.session.originalUrl || '/';
    delete req.session.originalUrl; // clear the stored URL
    res.redirect(redirectTo);
});

router.get('/logout', async (req, res) => {
    req.logout((error) => {
        if (error) {
            req.flash('error', 'Error while logging out !')
            console.log("error while logging out", error)
            return res.redirect('/hotels')
        }
        req.flash('success', 'Logged out successfully !')
        res.redirect('/hotels')
    })
})



module.exports = router;