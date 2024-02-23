const express = require('express');
const router = express.Router();
const examControllers = require('../controllers/examControllers');

router.post("/getAllHistory", examControllers.getAllHistory);
router.post("/getAllHistory/:state", examControllers.getAllHistoryByState);
router.post("/getWordList/:state", examControllers.getWordListByState);
router.post("/sendResult/:state", examControllers.sendExamResult);


module.exports = router;