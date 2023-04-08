# Staysense

- Redirect to old page after login
- Files upload feature, using cloudinary
- Get's time of last updated any thing (notifications, jobs, hotels, etc) - using moment package
- Geo-location maps features using


<!-- list of task to do  -->
1. File upload
2. Maps
3. UpVote/DownVote
4. Return URL
5. Last created, 5 min ago
6. Star rating
7. Searching
8. Pagination
9. Payment


## for redirecting old url
 <!-- add this to mongo connect uri -->
 .connect(URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})

<!-- add this to package.json (downgrade these packages) -->
 "express-session": "^1.17.1",
 "mongoose": "^5.10.4",
 "passport": "^0.4.1",
 "passport-local-mongoose": "^6.0.1"


## for maps
service : https://www.mapbox.com
examples : https://docs.mapbox.com/mapbox-gl-js/example/
test-coordinates : https://www.google.com/maps
map-box docs : https://github.com/mapbox/mapbox-sdk-js/
geo-coordinates docs : https://github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#geocoding

<!-- configuration -->
// ! MapBox configuration
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geoCoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
