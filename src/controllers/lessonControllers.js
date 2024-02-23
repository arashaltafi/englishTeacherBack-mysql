const mysql = require('../configs/db.config');

const getAllLesson = async (req, res, next) => {
    try {
        const { grouping } = req.body;
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

        const [lessons] = await mysql.query('SELECT * FROM tbl_lesson_word WHERE grouping = ?', [grouping]);

        const resultLessonData = {
            total: lessons.length,
            records: lessons.map((lesson) => {
                return {
                    id: lesson.id,
                    title: lesson.title,
                    image: lesson.image,
                    video: lesson.video,
                    state: lesson.state,
                }
            })
        }
        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: resultLessonData
        });
    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
        });
    }
}

const getLessonById = async (req, res, next) => {
    try {
        const { state } = req.params;
        const { grouping } = req.body;

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

        let lessonArray = []
        let antonym = [];
        let synonym = [];
        let sentenceEnglish = [];
        let sentencePersian = [];

        const [lessons] = await mysql.query('SELECT id, titleFa, titleEn, image FROM tbl_vocabulary WHERE grouping = ? AND state = ? ORDER BY id ASC', [grouping, state]);

        for (let i = 0; i < lessons.length; i++) {
            const [antonyms] = await mysql.query('SELECT english FROM tbl_sample_antonym WHERE baseWord = ?', [lessons[i].titleEn]);
            antonym.push([...antonyms]);

            const [synonyms] = await mysql.query('SELECT english FROM tbl_sample_synonym WHERE baseWord = ?', [lessons[i].titleEn]);
            synonym.push([...synonyms]);

            const [sentenceEnglishs] = await mysql.query('SELECT english FROM tbl_sample_sentences WHERE baseWord = ?', [lessons[i].titleEn]);
            sentenceEnglish.push([...sentenceEnglishs]);

            const [sentencePersians] = await mysql.query('SELECT persian FROM tbl_sample_sentences WHERE baseWord = ?', [lessons[i].titleEn]);
            sentencePersian.push([...sentencePersians]);

            lessonArray = [...lessonArray,
            {
                id: lessons[i].id,
                wordFa: lessons[i].titleFa,
                wordEn: lessons[i].titleEn,
                image: lessons[i].image,
                antonym: antonym[i].map((antonym) => {
                    return antonym.english
                }),
                synonym: synonym[i].map((synonym) => {
                    return synonym.english
                }),
                sentenceEnglish: sentenceEnglish[i].map((sentenceEnglish) => {
                    return sentenceEnglish.english
                }),
                sentencePersian: sentencePersian[i].map((sentencePersian) => {
                    return sentencePersian.persian
                })
            }
            ]
        }

        const resultLessonData = {
            total: lessons.length,
            records: lessonArray
        }
        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: resultLessonData
        });
    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
            error: error.message
        });
    }
}

module.exports = {
    getAllLesson, getLessonById
};