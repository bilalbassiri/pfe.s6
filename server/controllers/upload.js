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
        cloudinary.uploader.upload(blobDataURL, { folder: 'Avatars' }, async (err, result) => {
            const user = await Users.findByIdAndUpdate(id, { picture: result.url })
            if (user && !err) return res.status(200).json({ url: result.url })
            else return res.json({ url: user.picture })
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = uploadImage