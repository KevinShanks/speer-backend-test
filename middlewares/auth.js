const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Not Authenticated"});
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Not Authenticated" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = authenticate;