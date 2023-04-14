let express = require('express')
let Hotel = require('../models/hotel')
let { isLoggedIn, isHotelAuthor } = require('../middlewares/index')
const router = express.Router();


// ! cloud upload
const multer = require('multer')
const { storage } = require('../cloudinary/cloud_config')
const upload = multer({ storage })

// ! MapBox configuration
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geoCoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

router.get('/', (req, res) => {
    res.render("Landing")
})

router.get('/hotels', async (req, res) => {
    try {
        // let hotels = await Hotel.find({})
        let options = {
            page: req.query.page || 1,
            limit: 6,
            sort: {
                _id: 'desc'
            }
        }
        let hotels = await Hotel.paginate({}, options)
        // console.log(hotels)
        res.render('hotels/index', { hotels })
    } catch (error) {
        req.flash('error', 'error while fetching hotels, please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.get('/hotels/new', isLoggedIn, (req, res) => {
    res.render('hotels/new')
})

router.post('/hotels', isLoggedIn, upload.array('image'), async (req, res) => {
    // use upload.single('image') -> for single file upload
    console.log("body", req.body)
    console.log("files", req.files)
    try {
        let hotel = new Hotel(req.body.hotel)
        hotel.author = req.user._id;

        // * file upload using multer & cloudinary
        // hotel.image.url = req.files.path;
        // hotel.image.filename = req.file.filename;
        for (let file of req.files) {
            hotel.images.push({
                url: file.path,
                filename: file.filename
            });
        }

        // * geocoding using mapBox
        const geoData =  await geoCoder.forwardGeocode({
            query: req.body.hotel.address,
            limit: 1
        })
            .send();

            // console.log(geoData.body.features[0].geometry.coordinates)
        hotel.geometry = geoData.body.features[0].geometry;

        await hotel.save();
        // console.log(req.file)
        req.flash('success', 'Hotel Successfully created')
        res.redirect(`/hotels/${hotel._id}`)
    } catch (error) {
        req.flash('error', 'error while creating hotels, please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.get('/hotels/:id',isLoggedIn, async (req, res) => {
    try {
        let allHotels = await Hotel.find({})
        let hotel = await Hotel.findById(req.params.id)
            .populate({
                path: 'author'
            })
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            })
        // .populate('some-property')
        // .populate({
        // path: 'some-property'
        // populate: {
        // path: 'some-property'
        // }
        // })
        let coordinates = hotel.geometry.coordinates;
        res.render('hotels/show', { hotel,coordinates,allHotels })
    } catch (error) {
        req.flash('error', 'error while get hotels please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.get('/hotels/:id/edit', isLoggedIn, isHotelAuthor, async (req, res) => {
    try {
        let hotel = await Hotel.findById(req.params.id)
        res.render('hotels/edit', { hotel })
    } catch (error) {
        req.flash('error', 'error while edit hotels please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.patch('/hotels/:id', isLoggedIn, isHotelAuthor, async (req, res) => {
    try {
        await Hotel.findByIdAndUpdate(req.params.id, req.body.hotel)
        req.flash('success', 'Hotel Successfully updated')
        res.redirect(`/hotels/${req.params.id}`)
    } catch (error) {
        req.flash('error', 'error while edit hotels please try again later')
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/hotels/:id', isLoggedIn, isHotelAuthor, async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        req.flash('success', 'Hotel Successfully deleted')
        res.redirect('/hotels')
    } catch (error) {
        req.flash('error', 'error while delete hotel please try again later')
        console.log(error)
        res.redirect('/')
    }
})


router.get('/hotels/:id/upvote',isLoggedIn, async(req,res)=>{
    try {
        // check if user has already liked - remove the like
        const {id} = req.params;
        const hotel = await Hotel.findById(id)
        const upvoteExists = await Hotel.findOne({
            _id: id,
            upVotes: req.user._id
        })
        const downvoteExists = await Hotel.findOne({
            _id: id,
            downVotes: {
                _id: req.user._id
            }
        })
        if(upvoteExists){
            const hotel = await Hotel.findByIdAndUpdate(id,{
                $pull: {upVotes : req.user._id}
            })
            // console.log("Already found Like & Like Removed")
            res.redirect(`/hotels/${req.params.id}`)
        } else if(downvoteExists){
            const hotel = await Hotel.findByIdAndUpdate(id,{
                $pull: {downVotes : req.user._id},
                $push: {upVotes : req.user._id}
            })
            // console.log("Dislike Removed & Like Added")
            res.redirect(`/hotels/${req.params.id}`)
        } else {
            hotel.upVotes.push(req.user);
            hotel.save();
            // console.log("Like added")
            res.redirect(`/hotels/${req.params.id}`)
        }
    } catch (error) {
        req.flash('error', 'error while adding like to hotel please try again later')
        // console.log(error)
        res.redirect(`/hotels/${req.params.id}`)
    }
})

router.get('/hotels/:id/downvote',isLoggedIn, async(req,res)=>{
    try {
        // check if user has already liked - remove the like
        const {id} = req.params;
        const hotel = await Hotel.findById(id)
        const upvoteExists = await Hotel.findOne({
            _id: id,
            upVotes: req.user._id
        })
        const downvoteExists = await Hotel.findOne({
            _id: id,
            downVotes: {
                _id: req.user._id
            }
        })
        if(upvoteExists){
            const hotel = await Hotel.findByIdAndUpdate(id,{
                $pull: {upVotes : req.user._id},
                $push: {downVotes : req.user._id}
            })
            // console.log("Like Removed & Dislike Added")
            res.redirect(`/hotels/${req.params.id}`)
        } else if(downvoteExists){
            const hotel = await Hotel.findByIdAndUpdate(id,{
                $pull: {downVotes : req.user._id}
            })
            // console.log("Dislike Removed")
            res.redirect(`/hotels/${req.params.id}`)
        } else {
            hotel.downVotes.push(req.user);
            hotel.save();
            // console.log("DisLike added")
            res.redirect(`/hotels/${req.params.id}`)
        }
    } catch (error) {
        req.flash('error', 'error while adding dislike to hotel please try again later')
        console.log(error)
        res.redirect(`/hotels/${req.params.id}`)
    }
})



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