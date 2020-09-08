var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// @route   POST /api/user
// @des     Register/Create a user
// @access  Public
router.post('/user', authController.registerUser);


// @route   POST /api/login
// @des     Login user
// @access  Public
router.post('/login', authController.loginUser);

module.exports = router;
