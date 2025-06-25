const AISuggestion = require('../models/AISuggestion');
const axios = require('axios');

exports.getSuggestions = async (req, res) => {
  try {
    const suggestions = await AISuggestion.findAll({ where: { userId: req.query.userId } });
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.generateAndSaveSuggestion = async (req, res) => {
  const { prompt, userId } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const response = await axios.post(
      'https://api.deepseek.com/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a friendly budget management assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      }
    );

    const aiResponseContent = response.data.choices[0].message.content;

    const savedSuggestion = await AISuggestion.create({
      suggestionText: prompt,
      response: aiResponseContent,
      userId: userId
    });

    res.status(201).json(savedSuggestion);

  } catch (error) {
    console.error('Error in generateAndSaveSuggestion:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch and save AI suggestion.' });
  }
};
