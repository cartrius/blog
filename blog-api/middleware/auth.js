const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

function verifyAuthor(req, res, next) {
    if (req.user.role !== "AUTHOR") {
        return res.status(403).json({ message: "Authors only" });
    }
    next();
}

module.exports = { verifyToken, verifyAuthor };