require('dotenv').config();
// initializing variables from the envirement variables
const jwtSecret = process.env.JWTSECRET || "ChangeThisSecr3t.";
const port = process.env.PORT || 3000;
const server = process.env.SERVER || "localhost";
const dbUser = process.env.DB_USER || "user";
const node_env = process.env.NODE_ENV || "production";
let dbHost;
if (node_env === "test" || node_env === "development") {
  dbHost =  "localhost";
} else {
  dbHost = process.env.DB_HOST || "localhost";
}
const bcrypt = process.env.NODE_ENV === 'test' ? require('bcryptjs') : require('bcrypt');
const dbPass = process.env.DB_PASS || "password";
const dbDb = process.env.DB_DB || "starshop";

module.exports ={
  jwtSecret,
  port,
  server,
  dbUser,
  dbHost,
  dbPass,
  dbDb,
  bcrypt,
};