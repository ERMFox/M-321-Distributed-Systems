const { sanitizer } = require("./dbHandler");
const { bcrypt } = require('../config/config');
const jwthandler = require("./jwtHandler");

async function getAllUsers() {
  return await sanitizer("select", "users", {}, {
    columns: "users.id, users.username, users.email, roles.role AS role",
    join: {
      table: "roles",
      on: ["users.role_id", "roles.id"],
    },
  });
}

async function getOneUser(id) {
  return await sanitizer("select", "users", {}, {
    columns: "users.id, users.username, users.email, roles.role AS role",
    join: {
      table: "roles",
      on: ["users.role_id", "roles.id"],
    },
    where: "users.id = ?", whereParams: [id] });
}

async function deleteUser(id) {
  return await sanitizer("delete", "users", {}, { where: "id = ?", whereParams: [id] });
}

async function updateUser(id, user) {
  return await sanitizer("update", "users", user, { where: "id = ?", whereParams: [id] });
}

async function createUser(userData) {
  const { user, password, ...otherData } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  await sanitizer("insert", "users", { username: user, password: hashedPassword, ...otherData });
}

async function login(username, password) {
  try {
    const users = await sanitizer("select", "users", {}, {
      columns: "users.*, roles.role AS role",
      join: {
        table: "roles",
        on: ["users.role_id", "roles.id"],
      },
      where: "username = ?",
      whereParams: [username],
    });
    if (users.length === 0) {
      return null;
    }

    const user = users[0];

    let passwordMatch = user.password === password; // due to the original passwords in the db not beeing hashed we need to compare them directly while also allowing the hashed passwords to be compared
    if (!passwordMatch) {
      passwordMatch = await bcrypt.compare(password, user.password);
    }
    if (!passwordMatch) {
      return null;
    }

    const token = await jwthandler.makeJWT({ id: user.id, username: user.username, role: user.role });
    return token;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to log in");
  }
}


module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  createUser,
  login,
};
