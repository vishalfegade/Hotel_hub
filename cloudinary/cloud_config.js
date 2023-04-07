const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET_KEY,
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