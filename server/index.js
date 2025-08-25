require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
    cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Health check
app.get('/', (_req, res) => res.send('Battle Tent API is running')); // opening http://localhost:5000/ will return that Battle Tent is running

// Routes
app.use('/api/auth', authRoutes);

// 404 (after routes)
app.use((_req, res) => res.status(404).json({ message: 'Not found' }));

// Error handler (last)
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Server error' });
});

// Start after Mongo connects
const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI;

(async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error('Missing MONGODB_URI in .env');
        }

        // Connect to Mongo
        await mongoose.connect(MONGODB_URI, {
            autoIndex: true, // helpful in dev; consider disabling in prod for perf
        });
        console.log('✅ MongoDB connected');

        // Start server
        app.listen(PORT, () =>
            console.log(`Server listening on http://localhost:${PORT}`)
        );
    } catch (err) {
        console.error('Startup error:', err.message || err);
        process.exit(1);
    }
})();