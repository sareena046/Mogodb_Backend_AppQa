const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, admin) => {
        if (err) return res.status(403).json({ message: "Access token expired or invalid" });
        
        req.admin = admin; // Set the admin information in the request
        next();
    });
}

module.exports = authenticateToken;
