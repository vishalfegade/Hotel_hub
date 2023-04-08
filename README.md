# Staysense

- Redirect to old page after login
- Files upload feature, using cloudinary
- Get's time of last updated any thing (notifications, jobs, hotels, etc) - using moment package
- Geo-location maps features using


## --- list of task to do ---
- File upload - ✅
- Maps - ✅
- UpVote/DownVote
- Return URL - ✅
- Last created, 5 min ago - ✅
- Star rating - ✅
- Searching
- Pagination - ✅
- Payment


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