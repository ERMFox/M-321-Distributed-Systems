const mysql = require('mysql2');
const config = require('../config/config');
// config for db connection
const pool = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPass,
  database: config.dbDb,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// function to send any sql query to the db
function sendQuery(sql, queryParams) {
  return new Promise((resolve, reject) => {
    pool.query(sql, queryParams, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  sendQuery,
  pool,
};
