const router = require('express').Router();
const authController = require('./controllers/authController');
const publicationController = require('./controllers/publicationController');

router.use('/users', authController);
router.use('/publications', publicationController);

module.exports = router;