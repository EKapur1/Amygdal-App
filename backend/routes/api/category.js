const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Category = require('../../models/Category');
const jwt = require('jsonwebtoken');
const config = require('config');

// Create category --
// Delete category --
// Edit category --
// Create task --
// Delete task --
// Edit task --

// @route  POST api/category
// @desc   Create category
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

// @route  PUT api/category/:id
// @desc   Edit category
// @access Private

router.put('/:id', auth, async (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    category.name = req.body.name;
    //Save category to DB

    const cat = await category.save();
    res.json(cat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  DELETE api/category/:id
// @desc   Delete category
// @access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    // Remove category
    await Category.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Category deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  GET api/category
// @desc   Get all categories
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
// @desc   get category by ID
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

// @route  PUT api/category/tasks/:category_id
// @desc   Add task to category
// @access Private

router.put('/tasks/:category_id', auth, async (req, res) => {
  const token = req.header('x-auth-token');
  try {
    const category = await Category.findOne({ _id: req.params.category_id });
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const task = {
      user: decoded.user.id,
      categoryName: category.name,
      categoryId: category.id,
      text: req.body.text,
    };
    category.tasks.push(task);
    await category.save();

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/category/:cat_id/:id
// @desc     Delete a task by ID
// @access   Private
router.delete('/:cat_id/:id', [auth], async (req, res) => {
  try {
    const id = req.params.id;
    const cat_id = req.params.cat_id;
    const category = Category.findOneAndUpdate(
      { _id: cat_id },
      { $pull: { tasks: { _id: id } } },
      { new: true },
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
    res.json(category);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/category/:cat_id/:id
// @desc     Edit a task by ID
// @access   Private
router.put('/:cat_id/:id', [auth], async (req, res) => {
  try {
    const id = req.params.id;
    const cat_id = req.params.cat_id;

    const category = await Category.findById(cat_id);

    const task = await category.tasks.find((task) => task.id === id);

    if (!task) {
      return res.status(404).json({ msg: 'Task does not exist' });
    }

    const newTask = {
      categoryName: category.name,
      categoryId: category._id,
      text: req.body.text,
    };

    category.tasks = category.tasks.filter(({ id }) => id !== req.params.id);

    category.tasks.unshift(newTask);

    await category.save();

    res.json(category.tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
