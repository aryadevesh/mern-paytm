const JWT_SECRET = require("../routes/config");
const jwt = require("jsonwebtoken");




console.log("JWT_SECRET:", JWT_SECRET);
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        console.log("Authorization header missing or incorrect");
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log("JWT verification failed:", err.message);
        return res.status(403).json({});
    }
};

module.exports = authMiddleware;