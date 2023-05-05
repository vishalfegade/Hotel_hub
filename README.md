# Hotel Hub - Node JS

Hotel Finder is a web application built with Node.js that allows users to post and search for hotels, as well as perform other actions such as editing hotels, adding and editing users, upvoting and downvoting hotels, and making payments using Mapbox.


# Features

- Post new hotels with a title, description, location, price, and photos
- Edit existing hotels
- Search for hotels by location or keyword
- View detailed information about hotels, including photos and a map of the location
- Upvote and downvote hotels
- Register and log in users
- Edit user profiles
- Return users to their original URL after login, searching, or payment
- Pagination to limit the number of hotels displayed at once
- Star rating system for hotels
- Display the creation date for each hotel
- Multiple file upload for hotel photos

# Technologies
- Node.js
- Express.js
- MongoDB
- Passport.js for authentication
- Mapbox for payment processing and mapping
- EJS for server-side rendering
- Multer for file upload handling

# Getting Started
## Prerequisites
Before running this application, you must have the following software installed:

- Node.js
- MongoDB
## Installation
1. Clone this repository to your local machine
2. Install the dependencies using npm install
3. Create a .env file with your Mapbox API key and MongoDB connection string:
```
MAPBOX_API_KEY=YOUR_API_KEY
MONGODB_URI=YOUR_CONNECTION_STRING
```
4. Start the server using npm start
5. Visit http://localhost:3000 in your web browser to use the application

# Usage
To post a new hotel, click the "New Hotel" button on the home page and fill out the form. To edit an existing hotel, click the "Edit" button on the hotel's detail page.

To search for hotels, enter a location or keyword in the search bar on the home page. The results will be displayed with pagination.

To upvote or downvote a hotel, click the corresponding arrow on the hotel's detail page. You must be logged in to vote.

To register or log in a user, click the "Sign Up" or "Log In" button on the home page. After logging in, you will be returned to your original URL.

To make a payment, click the "Pay Now" button on the hotel's detail page. You will be redirected to a Mapbox payment form. After completing the payment, you will be returned to the hotel's detail page.

# Authors

- [@vishalfegade](https://github.com/vishalfegade)


# Contributing

This project is open for contributions. If you would like to contribute to this project, you can fork the repository and submit a pull request.<br>
Contributions are always welcome!

See `index.html` for ways to get started.

Please adhere to this project's `code of conduct`.


# Demo & Live Preview

https://hotel-hub-2r1i.onrender.com


# Feedback

If you have any feedback, please reach out to us at vsfegade2000@gmail.com


# 🔗 Links & Social Media

[<img src="https://www.seekpng.com/png/detail/111-1112824_picture-my-portfolio-logo-png.png" width="150">](https://codewithpankaj.vercel.app)

<a href="https://www.linkedin.com/in/vishal-f-10286924a/" target="blank"><img align="center" src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin" height="40"/></a><br><br>
<a href="https://leetcode.com/vsfegade/" target="blank"><img align="center" src="https://img.shields.io/badge/LeetCode-000000?style=for-the-badge&logo=LeetCode&logoColor=#d16c06" alt="LeetCode" height="40"/></a>
<a href="https://auth.geeksforgeeks.org/user/vsfegade/practice" target="blank"><img align="center" src="https://img.shields.io/badge/GeeksforGeeks-gray?style=for-the-badge&logo=geeksforgeeks&logoColor=35914c" alt="geeksforgeeks" height="40"/></a><br><br>



## --- list of features ---
- File upload - ✅
- Maps - ✅
- UpVote/DownVote - ✅
- Return URL - ✅
- Last created, 5 min ago - ✅
- Star rating - ✅
- Searching - ✅
- Pagination - ✅
- Payment - ✅


## for redirecting old url
 <!-- add this to mongo connect uri -->
 ```
 .connect(URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
```

<!-- add this to package.json (downgrade these packages) -->
```
 "express-session": "^1.17.1",
 "mongoose": "^5.10.4",
 "passport": "^0.4.1",
 "passport-local-mongoose": "^6.0.1"
```

## for maps

service : https://www.mapbox.com <br>
examples : https://docs.mapbox.com/mapbox-gl-js/example/ <br>
test-coordinates : https://www.google.com/maps <br>
map-box docs : https://github.com/mapbox/mapbox-sdk-js/ <br>
geo-coordinates docs : https://github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#geocoding <br>

<!-- configuration -->
// ! MapBox configuration
```
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geoCoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
```

## Star rating

Service : https://github.com/LunarLogic/starability
- add css (min file)
- add input fields
- add output fields

## Pagination

Package : https://www.npmjs.com/package/mongoose-paginate-v2 <br>
Pagination sample : https://getbootstrap.com/docs/5.3/components/pagination/#overview <br>

Install package
```
npm install mongoose-paginate-v2
```
Require Package
```
const mongoosePaginate = require('mongoose-paginate-v2');
```
Attach plugin to DataBase Schema
```
sampleSchema.plugin(mongoosePaginate)
```

- Model.paginate([query], [options], [callback])

## Searching

- make a JS function, which run on every key up on input field
- get all data, from which you want to search
- get input search query, make it case inSensitive
- filter data data, display "block" if found, otherwise "none".

## upVote & downVote

- you can upVote any hotel, by pressing 👍 button
- you can downVote any hotel, by pressing 👎 button

## Checkout / Payment

Testing Card No. : 4242424242424242<br>
Testing Card Expiry : 02 / 60<br>
Testing Card CVV : 422<br>
Testing Card Name : Pankaj Kumar<br>
Testing Card Country : India<br>

Package used : stripe
```
npm i stripe
```
Official Website : https://stripe.com/en-in