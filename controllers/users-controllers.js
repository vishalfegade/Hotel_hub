const User = require('../models/user')
const showUser = async (req,res)=>{
    try {
        let user = await User.findById(req.params.id)
        res.render('users/show',{user})
    } catch (error) {
        req.flash('error','error while fetching user, please try again later');
        console.log(error)
        res.redirect('/hotels')
    }
}

const editUser = async (req,res)=>{
    try {
        let user = await User.findById(req.user._id)
        res.render('users/edit',{user})
    } catch (error) {
        req.flash('error','error while editing user, please try again later');
        console.log(error)
        res.redirect('/hotels')
    }
}

const updateUser = async (req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id,req.body.user)
        req.flash('success', 'User update done')
        res.redirect(`/users/${req.params.id}`)
    } catch (error) {
        req.flash('error','error while editing user, please try again later');
        console.log(error)
        res.redirect(`/users/${req.params.id}`)
    }
}

const showUserPage = (req,res)=>{
    res.render('../views/users/user-page.ejs')
}

module.exports ={
    showUser,
    editUser,
    updateUser,
    showUserPage
}