const jwt = require('jsonwebtoken');



require('dotenv').config();


const authenticate = (req, res, next) => {
    const token = req.cookies.jwt_token;
    if (!token) {
        return res.status(401).send({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Assign decoded user id to req.user
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
