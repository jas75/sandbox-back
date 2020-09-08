var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const passport = require('passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

app.use('/api', indexRouter);
app.use('/users', usersRouter);

// DB connection
let mongoUri = config.mongoUri + config.dbName;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

connection.on('error', (err) => {
  console.log(
    'MongoDb connection error. Please make sure MongoDB is running. ' + err
  );
  process.exit();
});

module.exports = app;
