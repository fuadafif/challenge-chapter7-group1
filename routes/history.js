const router = require('express').Router();

// import controller
const {jwtAuthorization,history,} = require('../controllers/history');

router.post('/',jwtAuthorization,history);

module.exports = router;