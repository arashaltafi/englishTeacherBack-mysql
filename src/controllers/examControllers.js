const mysql = require('../configs/db.config');
const { getCurrentDateWithDayPersian } = require('../utils/Helper');

const getAllHistory = async (req, res, next) => {
    try {
        const { grouping } = req.body;
        const { page_number, page_size } = req.query;

        const pageOffset = (parseInt(page_number) - 1) * parseInt(page_size) || 0;
        const pageLimit = parseInt(page_size) || 1000;

        if (pageOffset < 0 || pageLimit <= 0) {
            return res.status(400).send({
                state: 'err',
                message: 'لطفا مقادیر page_number و page_size را به صورت صحیح وارد نمایید',
            });
        }

        if (!grouping) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات',
            })
        }
        if (typeof grouping !== 'string') {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات',
            })
        }
        if (grouping.length !== 3) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات',
            })
        }

        const token = req.headers.authorization;

        // Query To Get Phone By Token
        const [phone] = await mysql.query('SELECT phone FROM tbl_subscribers WHERE token = ?', [token]);

        // Check Phone Its For Token
        if (phone.length !== 1) {
            return res.status(401).send({
                state: 'err',
                message: "کد کاربر صحیح نمی باشد"
            });
        }

        const [exams] = await mysql.query('SELECT * FROM tbl_exam WHERE grouping = ? AND phone = ? ORDER BY id ASC LIMIT ? OFFSET ?', [grouping, phone[0].phone, pageLimit, pageOffset]);

        const resultExamData = {
            total: exams.length,
            records: exams.map((exam) => {
                return {
                    id: exam.id,
                    wrong: exam.wrong,
                    correct: exam.correct,
                    time: exam.time,
                    state: exam.state,
                }
            })
        }
        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: resultExamData
        });
    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
        });
    }
}

const getAllHistoryByState = async (req, res, next) => {
    try {
        const { state } = req.params
        const { grouping } = req.body;

        if (!grouping) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (typeof grouping !== 'string') {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (grouping.length !== 3) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }

        if (!state) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (typeof state !== 'string') {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (state.length !== 7 && state.length !== 8) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }

        const token = req.headers.authorization;

        // Query To Get Phone By Token
        const [phone] = await mysql.query('SELECT phone FROM tbl_subscribers WHERE token = ?', [token]);

        // Check Phone Its For Token
        if (phone.length !== 1) {
            return res.status(401).send({
                state: 'err',
                message: "کد کاربر صحیح نمی باشد"
            });
        }

        const [exams] = await mysql.query('SELECT * FROM tbl_exam WHERE grouping = ? AND phone = ? AND state = ?', [grouping, phone[0].phone, state]);

        const resultExamData = {
            total: exams.length,
            records: exams.map((exam) => {
                return {
                    id: exam.id,
                    wrong: exam.wrong,
                    correct: exam.correct,
                    time: exam.time,
                    state: exam.state,
                }
            })
        }
        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: resultExamData
        });

    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
        })
    }
}

const getWordListByState = async (req, res, next) => {
    try {
        const { state } = req.params
        const { grouping } = req.body;

        if (!grouping) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (typeof grouping !== 'string') {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (grouping.length !== 3) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }

        if (!state) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (typeof state !== 'string') {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (state.length !== 7 && state.length !== 8) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }

        const [exams] = await mysql.query('SELECT * FROM tbl_vocabulary WHERE grouping = ? AND state = ? ORDER BY id ASC', [grouping, state]);

        const resultExamData = {
            total: exams.length,
            records: exams.map((exam) => {
                return {
                    id: exam.id,
                    titleFa: exam.titleFa,
                    titleEn: exam.titleEn,
                    state: exam.state,
                }
            })
        }
        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: resultExamData
        });

    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
        })
    }
}

const sendExamResult = async (req, res, next) => {
    try {
        const { state } = req.params
        const { grouping, wrong, correct } = req.body;

        if (!grouping || !wrong || !correct) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (typeof grouping !== 'string' || typeof wrong !== 'string' || typeof correct !== 'string') {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (grouping.length !== 3 || wrong.length > 2 || correct.length > 2) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }

        // Check Sum Wrong and Correct Should Be 12
        if (parseInt(wrong) + parseInt(correct) !== 12) {
            return res.status(400).send({
                state: 'err',
                message: 'مجموع جواب های درست و غلط باید 12 باشند'
            })
        }

        if (!state) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (typeof state !== 'string') {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }
        if (state.length !== 7 && state.length !== 8) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }

        const token = req.headers.authorization;

        // Query To Get Phone By Token
        const [phone] = await mysql.query('SELECT phone FROM tbl_subscribers WHERE token = ?', [token]);

        // Check Phone Its For Token
        if (phone.length !== 1) {
            return res.status(401).send({
                state: 'err',
                message: "کد کاربر صحیح نمی باشد"
            });
        }

        const time = getCurrentDateWithDayPersian()

        // Insert Result Exam
        await mysql.query('INSERT INTO tbl_exam SET ?', {
            wrong: wrong,
            correct: correct,
            phone: phone[0].phone,
            state: state,
            time: time,
            grouping: grouping
        });

        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق'
        })

    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات'
        })
    }
}

module.exports = {
    getAllHistory, getAllHistoryByState, getWordListByState, sendExamResult
};