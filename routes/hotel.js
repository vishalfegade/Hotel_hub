let express = require("express");
const router = express.Router();
const { isLoggedIn, isHotelAuthor } = require("../middlewares/index");
const {showHome, showAllHotels, newHotelGet, newHotelPost, checkout, checkoutCancel, checkoutSuccess, downvoteHotel, upvoteHotel, deleteHotel, editHotelPost, editHotelGet, showHotel} = require('../controllers/hotel-controllers')

// ! cloud upload
const multer = require("multer");
const { storage } = require("../cloudinary/cloud_config");
const upload = multer({ storage });

router.get("/",showHome);

router.get("/hotels", showAllHotels);

router.get("/hotels/new", isLoggedIn, newHotelGet);

router.post("/hotels", isLoggedIn, upload.array("image"), newHotelPost);

router.get("/hotels/:id", isLoggedIn, showHotel);

router.get("/hotels/:id/edit", isLoggedIn, isHotelAuthor, editHotelGet);

router.patch("/hotels/:id", isLoggedIn, isHotelAuthor,upload.array("image"), editHotelPost);

router.delete("/hotels/:id", isLoggedIn, isHotelAuthor, deleteHotel);

router.get("/hotels/:id/upvote", isLoggedIn, upvoteHotel);

router.get("/hotels/:id/downvote", isLoggedIn, downvoteHotel);

router.get('/hotels/:id/checkout/success', checkoutSuccess)

router.get('/hotels/:id/checkout/cancel', checkoutCancel)

// payment gateway
router.get("/hotels/:id/checkout", isLoggedIn, checkout);

//! ways to create sample hotels, as many as you can
// router.get('/seed',isLoggedIn, async (req,res)=>{
//     try {
//         for(let i=0; i<=49; i++) {
//             let hotel = new Hotel({
//                 // name : 'Highway Hills',
//                 name : `Highway Hills ${i+1}`,
//                 geometry: {
//                     type: 'Point',
//                     coordinates: [77.2090057, 28.6138954]
//                 },
//                 address: 'Delhi',
//                 price: Math.floor(Math.random() * 10000),
//                 images: [
//                     {
//                         url: 'https://res.cloudinary.com/personal-storage/image/upload/v1681366137/Staysense/g0ozvlirg1wwpximv3t2.jpg',
//                         filename: 'Staysense/g0ozvlirg1wwpximv3t2'
//                     },
//                     {
//                         url: 'https://res.cloudinary.com/personal-storage/image/upload/v1681366137/Staysense/pypiyhfoq2vahqls2oxb.jpg',
//                         filename: 'Staysense/pypiyhfoq2vahqls2oxb'
//                     },
//                     {
//                         url: 'https://res.cloudinary.com/personal-storage/image/upload/v1681366135/Staysense/hwfijrvrdxu41zx1p42n.jpg',
//                         filename: 'Staysense/hwfijrvrdxu41zx1p42n'
//                     },
//                     {
//                         url: 'https://res.cloudinary.com/personal-storage/image/upload/v1681366136/Staysense/q2zn6dj68jcezrh2mwdt.jpg',
//                         filename: 'Staysense/q2zn6dj68jcezrh2mwdt'
//                     },
//                     {
//                         url: 'https://res.cloudinary.com/personal-storage/image/upload/v1681366136/Staysense/kfzcvda3krmcmmawttcx.jpg',
//                         filename: 'Staysense/kfzcvda3krmcmmawttcx'
//                     },
//                     {
//                         url: 'https://res.cloudinary.com/personal-storage/image/upload/v1681366134/Staysense/kihro66e5oziiqtouak1.jpg',
//                         filename: 'Staysense/kihro66e5oziiqtouak1'
//                     },
//                     {
//                         url: 'https://res.cloudinary.com/personal-storage/image/upload/v1681366137/Staysense/n6qs9pharagdtddswvbd.jpg',
//                         filename: 'Staysense/n6qs9pharagdtddswvbd'
//                     },
//                     {
//                         url: 'https://res.cloudinary.com/personal-storage/image/upload/v1681366136/Staysense/apy6uaj5h7zy2ldxclzf.jpg',
//                         filename: 'Staysense/apy6uaj5h7zy2ldxclzf'
//                     }
//                 ],
//                 upVotes : [],
//                 downVotes : []
//             });
//             hotel.author = req.user;
//             await hotel.save();
//         }
//         res.send('done')
//     } catch (error) {
//         console.log("error while make hotels", error)
//     }
// })

module.exports = router;
