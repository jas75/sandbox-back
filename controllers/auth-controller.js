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

  exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
      logger.info('Missing payload parameters');
      return res
        .status(400)
        .json({ msg: 'Email, alias or password not provided' });
    }
  
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        logger.error(err);
        return res.status(400).json({ msg: err });
      }
  
      if (!user) {
        logger.warn("Can't find a user");
        return res.status(400).json({ msg: 'User does not exists' });
      }
  
      // method of model User
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          logger.info('Token created for ' + user.email);
          // log successful
  
          let userParsed = user.toObject();
          delete userParsed['password'];
          delete userParsed.__v;
  
          return res.status(200).json({
            token: tokenGenerator.createToken(user),
            user: userParsed
          });
        } else {
          return res.status(400).json({
            msg: "Email and password don't match"
          });
        }
      });
    });
  };