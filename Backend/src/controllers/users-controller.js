const bcrypt = require('bcrypt');
const { jwtGenerator } = require('../utils/jwtGenerator');
const User = require('../models/user-schema');
// Register route
const register  = async (req, res) => {
  try {
    const { name , email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).send('User already exists. Please log in.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwtGenerator(newUser);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Login route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json('Email or password is incorrect');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json('Email or password is incorrect');
    }
    const token = jwtGenerator(user);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  register ,
  login,  
};
