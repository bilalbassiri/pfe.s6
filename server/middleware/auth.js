const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    try {
        const token = await req.header('Authorization');
        if (!token) return res.json({ msg: "Invalid authentication 1😢" , logged: false})
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.json({ msg: "Invalid authentication 2😢", logged: false})
            else {
                req.user = user;
                next()
            }
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports = auth