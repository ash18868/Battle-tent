module.exports = function toPublicUser(userDoc) {
    return {
        id: userDoc._id.toString(),
        username: userDoc.username,
        email: userDoc.email,          
        stats: userDoc.stats || { wins: 0, losses: 0, rating: 1000 },
        createdAt: userDoc.createdAt,
        updatedAt: userDoc.updatedAt
    };
};
