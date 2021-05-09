const Users = require('../models/User');
const Orders = require('../models/Order');
const Books = require('../models/Book');
const Reviews = require('../models/Review');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const controllers = {
    register: async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body;
            const user = await Users.findOne({ email })
            if (user) return res.json({ msg: 'Email already exist', signed: false })
            const passwordHash = await bcrypt.hash(password, saltRounds); // Password Encryption
            const newUser = new Users({
                name: first_name + ' ' + last_name,
                email,
                password: passwordHash
            })
            newUser.save(); // Save mongoDB
            const ACCESS_TOKEN = createAccessToken({ id: newUser._id });
            const REFRESH_TOKEN = createRefreshToken({ id: newUser._id });
            res.cookie('REFRESH_TOKEN', REFRESH_TOKEN, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            return res.json({ ACCESS_TOKEN, credentials: newUser, signed: true })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email })
            if (!user) {
                res.json({ msg: "Invalid email address!", logged: false })
            }
            else {
                const passwordMatch = await bcrypt.compare(password, user.password)
                if (passwordMatch) {
                    const ACCESS_TOKEN = createAccessToken({ id: user._id });
                    const REFRESH_TOKEN = createRefreshToken({ id: user._id });
                    res.cookie('REFRESH_TOKEN', REFRESH_TOKEN, {
                        httpOnly: true,
                        path: '/user/refresh_token'
                    })
                    return res.json({ ACCESS_TOKEN, logged: true })
                }
                else res.json({ msg: "Incorrect password!", logged: false })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            await res.clearCookie("REFRESH_TOKEN", { path: '/user/refresh_token' })
            return res.json({ msg: 'Logged out successfully ✔️' })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUser: async (req, res) => {
        try {
            const { id } = await req.user;
            const user = await Users.findOne({ _id: id }).populate('cart').populate('favoris');
            if (!user) return res.json(null);
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCart: async (req, res) => {
        try {
            const { id } = req.user;
            const { cart } = req.body;
            const user = await Users.findByIdAndUpdate(id, { cart }, { new: true }).populate('cart')
            return res.json(user.cart)
        } catch (err) {
            return res.status(500).json({ msg: '1' + err.message })
        }
    },
    updateFavoris: async (req, res) => {
        try {
            const { id } = req.user;
            const { favoris } = req.body;
            const user = await Users.findByIdAndUpdate(id, { favoris }, { new: true }).populate('favoris')
            return res.json(user.favoris)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addAnOrder: async (req, res) => {
        try {
            const { order } = req.body;
            const newOrder = await new Orders(order);
            newOrder.save(async (err, result) => {
                if (!err) {
                    const { cart } = await Users.findByIdAndUpdate(order.user._id, { cart: [] }, { new: true })
                    Array.from(order.books).forEach(async ({ _id, quantity, inCart }) => await Books.findByIdAndUpdate(_id, { quantity: quantity - inCart }))
                    return res.json({ cart, result })
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const { REFRESH_TOKEN } = req.cookies;
            if (!REFRESH_TOKEN) return res.json({ msg: "Login or register" })
            jwt.verify(REFRESH_TOKEN, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.json({ msg: "Login or register" });
                const _ACCESS_TOKEN = createAccessToken({ id: user.id });
                return res.status(200).json({ _ACCESS_TOKEN })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getPublicInfo: async (req, res) => {
        try {
            const { _id } = await req.body;
            const info = await Users.findOne({ _id }).select('-password -email -cart -favoris -notifications');
            const reviews = await Reviews.find({ owner: _id }).populate('book_id');
            if (!info) return res.json(null);
            return res.status(200).json({ info, reviews });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    uploadImage: async (req, res) => {
        try {
            const { _id } = await req.body;
            const info = await Users.findOne({ _id }).select('-password -email -cart -favoris -notifications');
            const reviews = await Reviews.find({ owner: _id }).populate('book_id');
            if (!info) return res.json(null);
            return res.status(200).json({ info, reviews });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};
const createAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
const createRefreshToken = user => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

module.exports = controllers;