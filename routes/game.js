const router = require('express').Router();

// import controller
const {game} =require('../controllers/game');
const {jwtAuthorization} = require('../middlewares/jwt');

router.post('/',jwtAuthorization,game);

module.exports = router;