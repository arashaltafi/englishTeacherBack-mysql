const mysql = require('../configs/db.config');

const getAll = async (req, res, next) => {
    try {
        const [basics] = await mysql.query('SELECT * FROM tbl_learn_base');

        const resultBasicData = {
            total: basics.length,
            records: basics.map((basic) => {
                return {
                    id: basic.id,
                    title: basic.title,
                    image: basic.image,
                    state: basic.state,
                }
            })
        }
        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: resultBasicData
        });
    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
        });
    }
}

const getAllByState = async (req, res, next) => {
    try {
        const { state } = req.params

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
        if (state.length > 20) {
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات'
            })
        }

        const [basics] = await mysql.query('SELECT * FROM tbl_properties_learn_base WHERE state = ?', [state]);

        const resultBasicData = {
            total: basics.length,
            records: basics.map((basic) => {
                return {
                    id: basic.id,
                    titleFa: basic.titleFa,
                    bgColorFa: basic.bgColorFa,
                    titleEn: basic.titleEn,
                    bgColorEn: basic.bgColorEn,
                }
            })
        }
        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: resultBasicData
        });

    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
        })
    }
}

module.exports = {
    getAll, getAllByState
};