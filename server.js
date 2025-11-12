// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Mock Data
let users = [{ username: "sara_khan", password: "sara123" }];

// GET - Fetch all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST - Add a new user
app.post("/users", (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Update a user by ID
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// DELETE - Remove a user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Mock API running on http://localhost:${PORT}`)
);
