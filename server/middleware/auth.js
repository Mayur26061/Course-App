/* eslint-disable no-undef */
const jwt = require("jsonwebtoken")

const generateToken = (target) => {
    const token = jwt.sign(target, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "2 days",
    }); // we have to pass object as target to use expiresIN as string
    return token;
};

const AuthenticateUser = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization)
    if (authorization) {
        let token = authorization.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, data) => {
            if (err) {
                return res.status(403).send({ error: "Forbidden" });
            }
            req.user = data.username;
            next();
        });
    } else {
        res.status(403).send({ error: "Unauthorized" });
    }
};

module.exports = {generateToken, AuthenticateUser}