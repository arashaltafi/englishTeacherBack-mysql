const mysql = require('../configs/db.config');

const getAllStory = async (req, res, next) => {
    try {
        const [stories] = await mysql.query('SELECT * FROM tbl_story');

        const resultStoryData = {
            total: stories.length,
            records: stories.map((story) => {
                return {
                    id: story.id,
                    titleFa: story.titleFa,
                    storyFa: story.storyFa,
                    titleEn: story.titleEn,
                    storyEn: story.storyEn,
                    image: story.image
                }
            })
        }
        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: resultStoryData
        });
    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
        });
    }
}

const getStoryById = async (req, res, next) => {
    try {
        const { id } = req.params
        const [story] = await mysql.query('SELECT * FROM tbl_story WHERE id = ?', [id]);

        const resultStoryData = {
            total: story.length,
            records: story.map((story) => {
                return {
                    id: story.id,
                    titleFa: story.titleFa,
                    storyFa: story.storyFa,
                    titleEn: story.titleEn,
                    storyEn: story.storyEn,
                    image: story.image
                }
            })
        }
        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: resultStoryData
        });
    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
        });
    }
}

module.exports = {
    getAllStory, getStoryById
};