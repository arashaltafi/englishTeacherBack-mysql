const express = require('express');
const router = express.Router();
const basicControllers = require('../controllers/basicControllers');

router.post("/getAll", basicControllers.getAll);
router.post("/getAll/:state", basicControllers.getAllByState);


module.exports = router;