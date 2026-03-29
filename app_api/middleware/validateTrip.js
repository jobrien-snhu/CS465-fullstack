const validateTrip = (req, res, next) => {
  const {
    code,
    name,
    length,
    start,
    resort,
    perPerson,
    image,
    description
  } = req.body;

  const errors = [];

  if (!code || code.trim() === "") {
    errors.push("Trip code is required.");
  }

  if (!name || name.trim() === "") {
    errors.push("Trip name is required.");
  }

  if (!length || String(length).trim() === "") {
    errors.push("Trip length is required.");
  }

  if (!start || isNaN(Date.parse(start))) {
    errors.push("A valid start date is required.");
  }

  if (!resort || resort.trim() === "") {
    errors.push("Resort is required.");
  }

  if (perPerson === undefined || perPerson === null || String(perPerson).trim() === "") {
    errors.push("Per person price is required.");
  } else if (isNaN(Number(perPerson)) || Number(perPerson) < 0) {
    errors.push("Per person price must be a valid non-negative number.");
  }

  if (!image || image.trim() === "") {
    errors.push("Image path is required.");
  }

  if (!description || description.trim() === "") {
    errors.push("Description is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed.",
      errors: errors
    });
  }

  next();
};

module.exports = validateTrip;