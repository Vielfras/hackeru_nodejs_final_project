// authRouter.js

const router = require('express').Router();
const { register, login, myProfile, mustLogin } = require('../controllers/authControllers');

//  base path = "/api/auth"

router.post('/register', register)
router.post('/login', login)
router.get('/profile', mustLogin, myProfile)

module.exports = router;