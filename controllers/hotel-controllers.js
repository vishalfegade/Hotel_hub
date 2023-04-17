let Hotel = require("../models/hotel");

//! stripe payment
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ! MapBox configuration
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geoCoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });



const showHome =  (req, res) => {
    res.render("landing");
}

const showAllHotels = async (req, res) => {
    try {
        // let hotels = await Hotel.find({})
        let options = {
            page: req.query.page || 1,
            limit: 6,
            sort: {
                _id: "desc",
            },
        };
        let hotels = await Hotel.paginate({}, options);
        // console.log(hotels)
        res.render("hotels/index", { hotels });
    } catch (error) {
        req.flash("error", "error while fetching hotels, please try again later");
        console.log(error);
        res.redirect("/");
    }
}

const newHotelGet = (req, res) => {
    res.render("hotels/new");
}

const newHotelPost = async (req, res) => {
    // use upload.single('image') -> for single file upload
    console.log("body", req.body);
    console.log("files", req.files);
    try {
        let hotel = new Hotel(req.body.hotel);
        hotel.author = req.user._id;

        // * file upload using multer & cloudinary
        // hotel.image.url = req.files.path;
        // hotel.image.filename = req.file.filename;
        for (let file of req.files) {
            hotel.images.push({
                url: file.path,
                filename: file.filename,
            });
        }

        // * geocoding using mapBox
        const geoData = await geoCoder
            .forwardGeocode({
                query: req.body.hotel.address,
                limit: 1,
            })
            .send();

        // console.log(geoData.body.features[0].geometry.coordinates)
        hotel.geometry = geoData.body.features[0].geometry;

        await hotel.save();
        // console.log(req.file)
        req.flash("success", "Hotel Successfully created");
        res.redirect(`/hotels/${hotel._id}`);
    } catch (error) {
        req.flash("error", "error while creating hotels, please try again later");
        console.log(error);
        res.redirect("/");
    }
}

const showHotel = async (req, res) => {
    try {
        let allHotels = await Hotel.find({});
        let hotel = await Hotel.findById(req.params.id)
            .populate({
                path: "author",
            })
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                },
            });
        // .populate('some-property')
        // .populate({
        // path: 'some-property'
        // populate: {
        // path: 'some-property'
        // }
        // })
        let coordinates = hotel.geometry.coordinates;
        res.render("hotels/show", { hotel, coordinates, allHotels });
    } catch (error) {
        req.flash("error", "error while get hotels please try again later");
        console.log(error);
        res.redirect("/");
    }
}

const editHotelGet = async (req, res) => {
    try {
        let hotel = await Hotel.findById(req.params.id);
        res.render("hotels/edit", { hotel });
    } catch (error) {
        req.flash("error", "error while edit hotels please try again later");
        console.log(error);
        res.redirect("/");
    }
}

const editHotelPost = async (req, res) => {
    try {
        await Hotel.findByIdAndUpdate(req.params.id, req.body.hotel);
        req.flash("success", "Hotel Successfully updated");
        res.redirect(`/hotels/${req.params.id}`);
    } catch (error) {
        req.flash("error", "error while edit hotels please try again later");
        console.log(error);
        res.redirect("/");
    }
}

const deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        req.flash("success", "Hotel Successfully deleted");
        res.redirect("/hotels");
    } catch (error) {
        req.flash("error", "error while delete hotel please try again later");
        console.log(error);
        res.redirect("/");
    }
}

const upvoteHotel = async (req, res) => {
    try {
        // check if user has already liked - remove the like
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        const upvoteExists = await Hotel.findOne({
            _id: id,
            upVotes: req.user._id,
        });
        const downvoteExists = await Hotel.findOne({
            _id: id,
            downVotes: {
                _id: req.user._id,
            },
        });
        if (upvoteExists) {
            await Hotel.findByIdAndUpdate(id, {
                $pull: { upVotes: req.user._id },
            });
            // console.log("Already found Like & Like Removed")
            res.redirect(`/hotels/${req.params.id}`);
        } else if (downvoteExists) {
            await Hotel.findByIdAndUpdate(id, {
                $pull: { downVotes: req.user._id },
                $push: { upVotes: req.user._id },
            });
            // console.log("Dislike Removed & Like Added")
            res.redirect(`/hotels/${req.params.id}`);
        } else {
            hotel.upVotes.push(req.user);
            hotel.save();
            // console.log("Like added")
            res.redirect(`/hotels/${req.params.id}`);
        }
    } catch (error) {
        req.flash(
            "error",
            "error while adding like to hotel please try again later"
        );
        // console.log(error)
        res.redirect(`/hotels/${req.params.id}`);
    }
}

const downvoteHotel = async (req, res) => {
    try {
        // check if user has already liked - remove the like
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        const upvoteExists = await Hotel.findOne({
            _id: id,
            upVotes: req.user._id,
        });
        const downvoteExists = await Hotel.findOne({
            _id: id,
            downVotes: {
                _id: req.user._id,
            },
        });
        if (upvoteExists) {
            await Hotel.findByIdAndUpdate(id, {
                $pull: { upVotes: req.user._id },
                $push: { downVotes: req.user._id },
            });
            // console.log("Like Removed & Dislike Added")
            res.redirect(`/hotels/${req.params.id}`);
        } else if (downvoteExists) {
            await Hotel.findByIdAndUpdate(id, {
                $pull: { downVotes: req.user._id },
            });
            // console.log("Dislike Removed")
            res.redirect(`/hotels/${req.params.id}`);
        } else {
            hotel.downVotes.push(req.user);
            hotel.save();
            // console.log("DisLike added")
            res.redirect(`/hotels/${req.params.id}`);
        }
    } catch (error) {
        req.flash(
            "error",
            "error while adding dislike to hotel please try again later"
        );
        console.log(error);
        res.redirect(`/hotels/${req.params.id}`);
    }
}

const checkoutSuccess = (req, res) => {
    res.send(`<div style="margin: auto;width: 500px;margin-top: 100px;color: green;">Payment Successfully Completed<br><br> <a href="/hotels/${req.params.id}"><button style="border: 2px solid black;border-radius: 5px;padding: 5px;">Go to Product Page</button></a></div>`)
}

const checkoutCancel = (req, res) => {
    res.send(`<div style="margin: auto;width: 500px;margin-top: 100px;color: red;">Payment Canceled<br><br> <a href="/hotels/${req.params.id}"><button style="border: 2px solid black;border-radius: 5px;padding: 5px;">Go to Product Page</button></a></div>`)
}

const checkout = async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: req.user.username,
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: hotel.name,
                        description: hotel.address,
                        images: [hotel.images[0].url]
                    },
                    unit_amount: hotel.price * 100,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.URL_SERV}/hotels/${hotel._id}/checkout/success`,
        cancel_url: `${process.env.URL_SERV}/hotels/${hotel._id}/checkout/cancel`,
    });
    // res.json({ id: session.id });
    res.redirect(session.url)
}

module.exports = {
    showHome,
    showAllHotels,
    newHotelGet,
    newHotelPost,
    showHotel,
    editHotelGet,
    editHotelPost,
    deleteHotel,
    upvoteHotel,
    downvoteHotel,
    checkoutSuccess,
    checkoutCancel,
    checkout
}