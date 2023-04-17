const express = require('express'),
    {isLoggedIn} = require('../middlewares/index')
const router = express.Router();

const {showUser,editUser, updateUser, showUserPage}  = require('../controllers/users-controllers')

router.get('/users/:id',isLoggedIn,showUser);

router.get('/users/:id/edit', editUser);

router.patch('/users/:id', updateUser)

// routes for user home page
router.get('/user/user-page',isLoggedIn, showUserPage)

module.exports = router;