const express = require('express');
const router = express.Router();
const lessonControllers = require('../controllers/lessonControllers');

router.post("/getAll", lessonControllers.getAllLesson);
router.post("/:state", lessonControllers.getLessonById);


module.exports = router;