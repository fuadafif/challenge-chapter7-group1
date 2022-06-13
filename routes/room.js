const router = require('express').Router();

const {room} = require('../controllers/room');
const {jwtAuthorization} = require('../middlewares/jwt');

router.post('/',jwtAuthorization,room);

module.exports = router;