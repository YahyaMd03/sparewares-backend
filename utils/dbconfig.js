const mongoose = require('mongoose');
require('dotenv').config();

const dbconnect = () => {
    const dbUrl = process.env.DATABASE_URL;

    mongoose.connect(dbUrl, {
        dbName: "spare_bees", // 👈 This ensures Mongoose uses the right database
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Database connection successful");
        })
        .catch((err) => {
            console.error("DB connection error:", err.message); // helpful for debugging
            setTimeout(dbconnect, 5000); // Retry connection after 5 seconds
        });
};

module.exports = dbconnect;
