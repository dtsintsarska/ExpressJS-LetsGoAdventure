const controllers = require('../controllers');
const router = require('express').Router();
const {
    auth
} = require('../utils');
const {
    route
} = require('./user');

router.get('/', controllers.offers.get);

// router.post('/', auth(), controllers.offers.post);

router.post('/create', controllers.offers.post)

router.get('/search/:category', controllers.offers.search)

router.get('/search/name/:regex', controllers.offers.searchInput)

router.put('/:id', controllers.offers.put);

router.get('/details/:id', controllers.offers.getOne)

router.post('/enroll/:id', auth(), controllers.offers.enroll)

router.delete('/delete/:id', auth(), controllers.offers.delete);

router.post('/comment/:id', auth(), controllers.offers.comment);

module.exports = router;