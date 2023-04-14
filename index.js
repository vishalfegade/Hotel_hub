//! MODULE REQUIREMENTS
const express = require('express'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    path = require('path'),
    moment = require("moment"),
    methodOverride = require('method-override');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.Database_URI;
const SESSION_PASSWORD = process.env.SESSION_PASSWORD

//! MONGOOSE CONNECTION
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.log("Database not connected", error);
    })

//! SESSION SETUP
// Use express-session middleware to save session data
app.use(session({
    secret: SESSION_PASSWORD,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true //for https not for localhost
        // 1000 milliseconds
        expires: Date.now * 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//! PASSPORT SETUP
const User = require('./models/user');
// used in logout user 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//! SERVER SETUP & MIDDLEWARES
app.use(flash())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.moment = moment;
    next()
})

//! API'S
const authRoutes = require('./routes/auth'),
    hotelRoutes = require('./routes/hotel'),
    userRoutes = require('./routes/users'),
    reviewRoutes = require('./routes/reviews');
app.use(authRoutes);
app.use(hotelRoutes);
app.use(userRoutes);
app.use(reviewRoutes);

//! PORT CONNECTION
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})