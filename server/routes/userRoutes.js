const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password.trim(), 10);

  const user = new User({
    firstname,
    email,
    password: hashedPassword,
  });

  await user.save();

  const token = user.generateToken();

  res.json({ token });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`); // Log received email and password
  
    const user = await User.findOne({ email });
    console.log(user); // Log the user document retrieved from the database
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  
    const validPassword = await bcrypt.compare(password.trim(), user.password);
    console.log(`Password Validity: ${validPassword}`); // Log the result of password comparison
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  
    const token = user.generateToken();
  
    res.json({ token });
  });

module.exports = router;