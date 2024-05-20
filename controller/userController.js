const User = require('../models/User'); // Verifică calea să fie corectă
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'user'
    });

    res.status(201).send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Error creating user', error });
  }
};
