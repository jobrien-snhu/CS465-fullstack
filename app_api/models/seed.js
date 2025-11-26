// Bring in the DB connection and the Trip schema
const mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from JSON file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Wait for DB connection before executing seed operations
mongoose.connection.once('connected', async () => {
    console.log("Database connected. Beginning seed...");

    try {
        // Remove all existing trip records
        await Trip.deleteMany({});
        console.log("Existing trips removed.");

        // Insert seed data
        await Trip.insertMany(trips);
        console.log("Seed data inserted successfully.");
    } 
    catch (err) {
        console.error("Error during seed:", err);
    }

    // Close MongoDB connection (Mongoose 7+ requires async/await)
    try {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    } catch (err) {
        console.error("Error closing connection:", err);
    }

    process.exit(0);
});
