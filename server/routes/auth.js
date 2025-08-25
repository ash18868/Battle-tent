const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');


function toPublicUser(u) {
    return {
        id: u._id,
        username: u.username,
        email: u.email,
        stats: u.stats,
        createdAt: u.createdAt
    };
}


// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body; // Parse request body
        if (!username || !email || !password) return res.status(400).json({ message: 'All fields required' });
        if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

        // $or lets us check for a match to either the email or username
        const existing = await User.findOne({ $or: [{ email }, { username }] }); // Use mongooses (built-in) .findOne to search User model for existing username or email
        if (existing) return res.status(409).json({ message: 'Email or username already in use' });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, passwordHash });

        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(201).json({ token, user: toPublicUser(user) }); // 201 Success
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});


// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        if (!emailOrUsername || !password) return res.status(400).json({ message: 'All fields required' });

        const user = await User.findOne({ $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername }] }); // awaits for user to be found, again $or lets us find a match for either the username or email
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });


        const ok = await bcrypt.compare(password, user.passwordHash); // Compares the provided password with the stored passwordhash
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });


        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token, user: toPublicUser(user) }); // returns user info plus a token that the frontend can now attach to all subsequent requests giving them access
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});


// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user: toPublicUser(user) });
});


module.exports = router;