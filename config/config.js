// module.exports = {
//     dbUser: process.env.DB_USER,
//     dbPass: process.env.DB_PASS,
//     dbName: process.env.DB_NAME,
//     dbHost: process.env.DB_HOST,
//     mongoUri: 'mongodb://' + this.dbUser + ':' + this.dbPass + '@' + this.dbHost + '/' + this.dbName,
//     jwtSecret: process.env.JWT_SECRET
//   };

module.exports = {
    dbUser: '',
    dbPass: '',
    dbName: 'sandbox',
    dbHost: '',
    mongoUri: 'mongodb://localhost:27017/',
    jwtSecret: process.env.JWT_SECRET || 'unsecret'
  };
  