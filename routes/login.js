const router = require('express').Router();

// import controller
const {login} = require('../controllers/login');

router.use('/',login);

module.exports = router;