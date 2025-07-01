const jwt = require("jsonwebtoken");

require('dotenv').config({ path: 'secret.env' });

const sessionKey = process.env.SESSION_SECRECT;
function generateToken(user) {
    const payload = {
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    }
    const token = jwt.sign(payload,sessionKey);
    return token;
}
function validateToken(token) {
    const payload = jwt.verify(token, sessionKey);
    return payload;
}

module.exports={
    generateToken,
    validateToken,
};