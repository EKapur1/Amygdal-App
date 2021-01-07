const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

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

module.exports = router;
