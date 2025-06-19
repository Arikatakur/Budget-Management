const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { userId: req.query.userId } });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
