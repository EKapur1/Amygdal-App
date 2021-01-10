const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route    GET api/users
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    const user = await User.findOne({ _id: decoded.user.id }).select(
      '-password'
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/users
// @desc   Get all users
// @access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await User.find().populate('user', [
      'name',
      'surname',
      'email',
      'avatar',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  DELETE api/users
// @desc   Delete user
// @access Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  PUT api/users/profile
// @desc   Change password
// @access Private

router.put(
  '/profile',
  [
    auth,
    check('password', 'Please include a valid password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, password } = req.body;

    const token = req.header('x-auth-token');
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    try {
      let user = await User.findOne({ _id: decoded.user.id });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      } else {
        const salt = await bcrypt.genSalt(10);
        HashPassword = await bcrypt.hash(password, salt);
        user.password = HashPassword;
        await user.save();
        res.send('Password changed!');
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
