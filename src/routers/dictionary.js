const express = require('express');
const router = express.Router();
const dictionaryController = require('../controllers/dictionaryControllers');

router.get("/search", dictionaryController.searchDictionary);

module.exports = router;