const aiService = require('../services/aiService');

exports.getSuggestions = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId query param required' });

    const rows = await aiService.list(userId);
    res.json(rows);
  } catch (err) {
    next(err); 
  }
};


exports.generateAndSaveSuggestion = async (req, res, next) => {
  try {
    const { userId, prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const record = await aiService.generateAndSave(userId, prompt);
    res.status(201).json(record);
  } catch (err) {
    const message =
      err.response?.data?.error || err.message || 'Failed to fetch/save AI suggestion';
    next(new Error(message));
  }
};
