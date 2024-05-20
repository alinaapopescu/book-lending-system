const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body;
    const user = await User.create({ username, email, password, role });
    res.status(201).send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Error creating user', error });
  }
}

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password, role: 'user' });
    res.status(201).send({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send({ message: 'Registration failed', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);  // Log email corect

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("No user found with that email"); // exista utilizatorul
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, // Cheia secreta
      { expiresIn: '24h' }
    );

    res.send({ message: "Login successful", token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Login failed', error });
  }
};
