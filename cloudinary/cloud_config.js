const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Staysense',
        //   format: async (req, file) => 'png', // supports promises as well
        allowedFormats: ['png', 'jpg', 'jpeg']
        //   public_id: (req, file) => 'computed-filename-using-request',
    },
});

module.exports = {
    cloudinary,
    storage
};