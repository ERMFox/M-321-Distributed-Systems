const jwt = require("jsonwebtoken");
const config = require("../config/config");

async function makeJWT(payload){
  if (!payload) return null;
  const token = await jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
  return token;
}

async function verifyJTW(token){
  try {
    if (!token) return null;
    const verified = await jwt.verify(token, config.jwtSecret);
    return verified;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

module.exports = {
  makeJWT,
  verifyJTW,
};
