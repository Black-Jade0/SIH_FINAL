const jwt = require("jsonwebtoken");
const { JWT_PASSWORD } = require("./config");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    console.log("Got token from cookies");
    try {
        console.log("rec. token: ",token)
        const decoded = jwt.verify(token, JWT_PASSWORD);
        console.log("Decoded",decoded);
        if (decoded && decoded.userId) {
            // Corrected to access userId from the structured payload
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({ error: "Decoded body incorrect" });
        }
    } catch (error) {
        console.log("Auth Failed",error);
        return res.status(403).json({ message: "Authorization failed !" });
    }
};

module.exports = {
    authMiddleware,
};
