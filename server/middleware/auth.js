const jwt = require('jsonwebtoken');


module.exports = function auth(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null; // We slice at index 7 so that it skips "Bearer " and just grabs the token
    if (!token) return res.status(401).json({ message: 'Missing token' }); // if no token is present
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.sub;
        next(); // Tells express to keep going
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}