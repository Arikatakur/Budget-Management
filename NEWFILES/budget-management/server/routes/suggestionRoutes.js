const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestionController');

router.get('/', suggestionController.getSuggestions);
router.post('/', suggestionController.createSuggestion); // Optional, if suggestions are generated server-side

module.exports = router;
