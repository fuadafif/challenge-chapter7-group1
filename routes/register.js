const router = require('express').Router();

// import controller
 const {register} = require('../controllers/register');

router.post('/',register)


module.exports = router;