const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/fetchuser');
const multer = require('multer');
const storage = require('../middleware/fetchmedia');

const upload = multer({ storage: storage('uploads') });
const router = express.Router();
const JWT_SECRET = 'my-@#$-key';

// Route: Create a new user
router.post('/createuser', upload.single('profile'), [
  // Request body validation using express-validator
  body('username', 'Enter a valid Username of length 3 or more').isLength({ min: 3 }),
  body('fullname', 'Enter a valid Fullname of length 3 or more').isLength({ min: 3 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password length should be 5 or more').isLength({ min: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Check if the user already exists with the given username or email
    let user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (user) {
      if (user.username === req.body.username) {
        return res.status(400).json({ error: "A user with this username already exists" });
      } else if (user.email === req.body.email) {
        return res.status(400).json({ error: "A user with this email already exists" });
      }
    }

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Check if the file type is valid (image)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type. Only image files are allowed." });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the user
    user = await User.create({
      image: req.file.path,
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword
    });

    // Generate JWT token for authentication
    const payload = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({ authToken, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});


// Route: Login user
router.post('/loginuser', [
  // Request body validation using express-validator
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password should not be empty').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find the user with the given email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    // Compare the provided password with the stored hashed password
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT token for authentication
    const payload = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({ authToken, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route: Get logged-in user details
router.get('/getuser', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route: Update user details
router.put('/updateuser', auth, upload.single('profile'), async (req, res) => {
  try {
    const { username, fullname, email } = req.body;
    const userId = req.user.id;

    // Check if the user is the owner of the profile being updated
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is updating their own profile
    if (user._id.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    user.username = username;
    user.fullname = fullname;
    user.email = email;

    // Check if a file was uploaded
    if (req.file) {
      // Check if the file type is valid (image)
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: 'Invalid file type. Only image files are allowed.' });
      }

      // Update the user's image
      user.image = req.file.path;
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route: Change Password
router.put('/changepassword', auth, [
  body('oldPassword', 'Old password is required').notEmpty(),
  body('newPassword', 'New password is required').isLength({ min: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Check if the user is the owner of the profile
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is changing their own password
    if (user._id.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});


// Route: Get all users
router.get('/getallusers', async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route: Delete user
router.delete('/deleteuser', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if the user is the owner of the profile being deleted
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is deleting their own profile
    if (user._id.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Find the user by ID and remove it from the database
    await User.findByIdAndRemove(userId);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;