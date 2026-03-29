const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res, next) => {
    try {

        const trips = await Model.find({}).exec();
        return res.status(200).json(trips);

    } catch (error) { 

        next(error);

    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res, next) => {
    try {
        const trip = await Model.findOne({ 'code': req.params.tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ message: "Trip not found." })
        }

        return res.status(200).json(trip);

    } catch (error) {
        next(error);
    }
    
};

// POST: /trips – Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res, next) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        
        const savedTrip = await newTrip.save();
        return res.status(201).json(savedTrip);

    } catch (error) {
        
        next(error);

    }

};

// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res, next) => {
    try {
        const updatedTrip = await Model.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found." });
        }

        return res.status(200).json(updatedTrip);
    } catch (error) {

        next(error);
        
    }
};



module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
