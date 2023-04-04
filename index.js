//! MODULE REQUIREMENTS
const express = require('express'),
    mongoose = require('mongoose'),
    flash = require('connect-flash');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.Database_URI;

//! MONGOOSE CONNECTION
mongoose.connect(URI)
.then(()=>{
    console.log("Database Connected");
})
.catch((error)=>{
    console.log("Database not connected",error);
})

//! SERVER SETUP & MIDDLEWARES
app.use(flash())
app.set('view engine','ejs')
app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

//! API'S
const hotelRoutes = require('./routes/hotel');
app.use(hotelRoutes);

//! PORT CONNECTION
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})