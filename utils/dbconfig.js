const mongoose = require('mongoose');
require('dotenv').config();

const dbconnect = () => {
    const dbUrl = process.env.DATABASE_URL;

    mongoose.connect(dbUrl, {
    })
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        setTimeout(dbconnect, 5000); // Retry connection after 5 seconds
    });
};

module.exports = dbconnect;
