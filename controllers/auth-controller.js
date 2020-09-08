const User = require('../models/user');
const logger = require('../utils/logger');
const tokenGenerator = require('../utils/token');

exports.registerUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
      logger.warn('Missing payload parameters');
      return res.status(400).json({ msg: 'You need to send mail and password' });
    }
  
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        logger.error(err);
        return res.status(400).json({ msg: err });
      }
  
      if (user) {
        logger.warn(user.email + ' is already in database');
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      const newUser = User(req.body);
  
      newUser.save((err, user) => {
        if (err) {
          if (err.name === 'ValidationError') {
            logger.warn('Wrong email input');
            return res.status(400).json({ msg: 'Wrong email format' });
          }
          logger.error(err);
          return res.status(400).json({ msg: err });
        }
  
        logger.info('User ' + user.email + ' created');
        return res
          .status(201)
          .json({ status: 'OK', msg: 'User created with success' });
      });
    });
  };