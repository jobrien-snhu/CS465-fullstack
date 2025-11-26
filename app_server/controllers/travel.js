const tripsEndpoint = "http://localhost:3000/api/trips";

const options = {
    method: "GET",
    headers: {
        Accept: "application/json"
    }
};

/* GET main travel list */
const travel = async function (req, res, next) {

    await fetch(tripsEndpoint, options)
        .then((response) => response.json())
        .then((json) => {

            let message = null;

            if (!Array.isArray(json)) {
                message = "API lookup error";
                json = [];
            } else if (json.length === 0) {
                message = "No trips exist in our database";
            }

            res.render("travel", {
                title: "Travlr Getaways",
                trips: json,
                message
            });
        })
        .catch((err) => res.status(500).send(err.message));
};


/* GET individual trip details */
const tripDetails = async function (req, res, next) {

    const tripCode = req.params.tripCode;
    const detailEndpoint = `${tripsEndpoint}/${tripCode}`;

    await fetch(detailEndpoint, options)
        .then((response) => response.json())
        .then((json) => {

            let message = null;

            // Validate response object
            if (!json || typeof json !== "object" || Array.isArray(json)) {
                message = "Trip not found";
                json = null;
            }

            res.render("tripDetails", {
                title: "Trip Details",
                trip: json,
                message
            });
        })
        .catch((err) => res.status(500).send(err.message));
};



module.exports = {
    travel,
    tripDetails
};
