// authentication
const isLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()){
        next();
    } else {
        console.log("you are not logged in")
        res.redirect('/login')
    }
}

// authorization


// exports
module.exports = {
    isLoggedIn
}