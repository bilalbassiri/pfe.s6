const Users = require('../models/User');
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
                res.json({ msg: "Invalid email address! 😩", logged: false })
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
                else res.json({ msg: "Incorrect password! 😩", logged: false })
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
            const user = await Users.findById(id).select('-password');
            if (!user) return res.json({ msg: "User does not exist 😎" });
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const { REFRESH_TOKEN } = req.cookies;
            if (!REFRESH_TOKEN) return res.status(400).json({ msg: "Login or register" })
            jwt.verify(REFRESH_TOKEN, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Login or register" });
                const _ACCESS_TOKEN = createAccessToken({ id: user.id });
                return res.status(200).json({ _ACCESS_TOKEN })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
};
const createAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
const createRefreshToken = user => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

module.exports = controllers;