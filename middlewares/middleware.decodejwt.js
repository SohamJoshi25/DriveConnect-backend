const jwt = require('jsonwebtoken'); // Ensure jwt is imported

const decodeJwt = (req, res, next) => {

    // Get the token from the Authorization header
    const authHeader = req.headers.authorization 
    const paramToken = req.query.token;

    console.log(paramToken)
    if ((!authHeader || !authHeader.startsWith('Bearer ') ) && !paramToken) {
        return res.status(400).json({ error: "Token Not Found or Invalid Format : Express" });
    }

    // Extract the token from the header
    const token = authHeader ? authHeader.split(' ')[1] : paramToken; // Gets the token after "Bearer "

    try {
        // Verify the token with the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        const UserId = decoded.UserId;
        
        if (UserId) {
            req.session.UserId = UserId;
        } else {
            return res.status(400).json({ error: 'Invalid token payload' });
        }

    } catch (err) {
        console.error("Error decoding JWT:", err);
        return res.status(400).json({ error: 'Invalid or expired token : Express' });
    }

    next(); // Proceed to the next middleware
};
 
module.exports = decodeJwt;
