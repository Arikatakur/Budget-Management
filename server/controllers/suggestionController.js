const AISuggestion = require('../models/AISuggestion');

exports.getSuggestions = async (req, res) => {
  try {
    const suggestions = await AISuggestion.findAll({ where: { userId: req.query.userId } });
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSuggestion = async (req, res) => {
  try {
    const suggestion = await AISuggestion.create(req.body);
    res.status(201).json(suggestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
