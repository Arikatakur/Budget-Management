const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestionController');

router.get('/', suggestionController.getSuggestions); // To get history
// The new endpoint combines generation and creation
router.post('/generate', suggestionController.generateAndSaveSuggestion);

module.exports = router;
