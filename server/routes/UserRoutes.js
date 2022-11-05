const express = require('express')
const { login,registerUser } = require('../controllers/User')
// const { protect } = require('../middleware/auth');
const { protect } = require('../middleware/protect');

const router = express.Router()

router.route('/register').post(registerUser);
router.route('/login').post(login);

module.exports = router