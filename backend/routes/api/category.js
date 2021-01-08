const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Tasks = require('../../models/Tasks');
const Category = require('../../models/Category');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route  POST api/category
// @desc   add category
// @access Private

router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  const token = req.header('x-auth-token');
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    user = decoded.user.id;
    category = new Category({
      user,
      name,
    });
    //Save category to DB

    const cat = await category.save();
    res.json(cat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  GET api/category
// @desc   get all categories
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  GET api/category/:id
// @desc   get categories by ID
// @access Private

router.get('/:user_id', auth, async (req, res) => {
  const { name } = req.body;
  const token = req.header('x-auth-token');
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    user = decoded.user.id;
    userId = req.params.user_id;
    const categories = await Category.find({
      user: userId,
    }).populate();
    if (userId != user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/*router.get('/user/:user_id', checkObjectId('user_id'), async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name', 'avatar']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);*/

/*
// @route  GET api/category
// @desc   Get all categories
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find().populate('user', [
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
*/
module.exports = router;
