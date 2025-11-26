var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel');

/* GET travel page. */
router.get('/', controller.travel);
router.get('/:tripCode', controller.tripDetails);


module.exports = router;
