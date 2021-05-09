require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const Users = require('../models/User');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadImage = async (req, res) => {

    try {
        const { id } = req.user;
        const { blobDataURL } = await req.body
        const { url } = await cloudinary.uploader.upload(blobDataURL, { folder: 'Avatars' })
        const user = await Users.findByIdAndUpdate(id, { picture: url })
        if (!user) return res.json({ msg: 'something went wrong !!' });
        return res.status(200).json({ url })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

module.exports = uploadImage