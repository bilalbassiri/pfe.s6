const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const controllers = {
    register: async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body;
            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: 'Already exist' })
            const passwordHash = await bcrypt.hash(password, saltRounds)
            const newUser = new Users({
                name: first_name + ' ' + last_name,
                email,
                password: passwordHash
            })
            await newUser.save();
            return res.json(newUser)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
module.exports = controllers