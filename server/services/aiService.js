const axios = require('axios');
const AISuggestion = require('../models/AISuggestion');

async function callLLM(prompt) {
  const { DEEPSEEK_API_KEY } = process.env;
  try {
    const res = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a friendly budget assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('LLM call failed:', err.response?.data || err.message);
    throw new Error('LLM provider error');
  }
}

module.exports = {
  list: async (userId) => {
    return AISuggestion.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
  },

  generateAndSave: async (userId, prompt) => {
    const response = await callLLM(prompt);
    const record = await AISuggestion.create({
      userId,
      prompt,
      response
    });
    return record;
  }
};
