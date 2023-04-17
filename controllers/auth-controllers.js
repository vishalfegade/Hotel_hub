const User = require('../models/user');

const showRegisterForm = async (req, res) => {
    // register form
    res.render('users/register')
}

const getRegistrationForm = async (req, res) => {
    try {
        let user = new User({
            username: req.body.username,
            name: req.body.name
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
}

const loginForm = async (req, res) => {
    // login form
    res.render('users/login')
}

const getLoginForm = (req, res) => {
    req.flash('success', 'welcome back user')


    // redirect to the original URL or a default URL
    // console.log('req.session.originalUrl', req.session.originalUrl)
    const redirectTo = req.session.originalUrl || '/';
    delete req.session.originalUrl; // clear the stored URL
    res.redirect(redirectTo);
}

const logout = (req, res) => {
    req.logout();
    res.redirect("/");
}

module.exports = {
    showRegisterForm,
    getRegistrationForm,
    loginForm,
    getLoginForm,
    logout
}