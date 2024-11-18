const express = require('express');
const { login, getAllUsers, createUser, getOneUser, deleteUser, updateUser } = require('../handlers/userHandler.js');
const { authenticate, adminProtected, selfProtected } = require('../middleware/auth');
const validateFields = require("../middleware/validator");

const router = express.Router();

router.post('/login', async(req, res) => {
  const { user, password } = req.body;

  try {
    const token = await login(user, password);

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/', authenticate, adminProtected, async(req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

router.post('/', validateFields, async(req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.delete('/:id', authenticate, selfProtected, async(req, res) => {
  try {
    await deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.get('/:id', authenticate, selfProtected, async(req, res) => {
  try {
    const user = await getOneUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

router.put('/:id', validateFields, authenticate, selfProtected, async(req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;
