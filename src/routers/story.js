const express = require('express');
const router = express.Router();
const storyControllers = require('../controllers/storyControllers');

router.get("/getAll", storyControllers.getAllStory);
router.get("/:id", storyControllers.getStoryById);


module.exports = router;