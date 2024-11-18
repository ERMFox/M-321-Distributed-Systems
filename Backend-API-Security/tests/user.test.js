const { getOneUser,  getAllUsers, updateUser, deleteUser, createUser } = require("../handlers/userHandler");
const { pool } = require("../dbConnection/connector");

afterAll(async() =>{
  await pool.end();
});

test('get one user', async() => {
  const result = await getOneUser(1);
  expect(result).toEqual([
    {
      "id": 1,
      "username": "Admin",
      "email": "admin@starshop.ch",
      "role": "Admin",
    },
  ]);
});

test('create user', async() => {
  await createUser({
    "user": "admin2",
    "password": "1234",
    "email": "admin2@me.me",
    "role_id": 1,
  });
  const result = await getOneUser(3);
  expect(result).toEqual([
    {
      "id": 3,
      "username": "admin2",
      "email": "admin2@me.me",
      "role": "Admin",
    },
  ]);
});

test('get deleted user', async() => {
  await deleteUser(3);
  const result = await getOneUser(3);
  expect(result).toEqual([]);
});

test('get all users', async() => {
  const result = await getAllUsers();
  expect(result).toEqual([
    {
      id: 1,
      username: 'Admin',
      email: 'admin@starshop.ch',
      role: 'Admin',
    },
    { id: 2, username: 'tim', email: 'tim@starshop.ch', role: 'Citizen' },
  ]);
});

test('update one user', async() => {
  await updateUser(1, { username: "bro3" });
  const result = await getOneUser(1);
  expect(result).toEqual([
    {
      "id": 1,
      "username": "bro3",
      "email": "admin@starshop.ch",
      "role": "Admin",
    },
  ]);
});
