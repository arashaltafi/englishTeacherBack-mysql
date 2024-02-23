const dictionaryRouter = require('./dictionary');
const verifyRouter = require('./verify');
const storyRouter = require('./story');
const lessonRouter = require('./lesson');
const examRouter = require('./exam');
const basicRouter = require('./basic');
const profileRouter = require('./profile');
const auth = require('../middlewares/auth')

module.exports = (app) => {
    app.use('/api/v1/verify', verifyRouter);
    app.use('/api/v1/dictionary', [auth], dictionaryRouter);
    app.use('/api/v1/story', [auth], storyRouter);
    app.use('/api/v1/lesson', [auth], lessonRouter);
    app.use('/api/v1/exam', [auth], examRouter);
    app.use('/api/v1/basic', [auth], basicRouter);
    app.use('/api/v1/profile', [auth], profileRouter);
}