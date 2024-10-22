const jwt = require('jsonwebtoken');

const generateJWT = async (expiresIn = '1h',payload) => {

    const secretKey = process.env.JWT_SECRET;
    const options = {
      expiresIn: expiresIn
    };

    try {

        const token = await jwt.sign(payload, secretKey, options);
        return token;
        
    } catch (err) {
        throw new Error(err);
    }

};


const decodeJWT = async (token) => {

    const secretKey = process.env.JWT_SECRET;

    if(!token) throw Error("Token Not Found : decodeJWT util");

    try {
        const payload = await jwt.verify(token, secretKey);
        return payload;
    } catch (err) {
        throw new Error(err);
    }

};




module.exports = {generateJWT,decodeJWT};