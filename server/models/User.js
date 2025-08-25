const { Schema, model } = require('mongoose');


const StatsSchema = new Schema({
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    rating: { type: Number, default: 1000 }
}, { _id: false }); // Don't associate an ID with this subdocument


const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 24 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    stats: { type: StatsSchema, default: () => ({}) }
}, { timestamps: true });


module.exports = model('User', UserSchema);