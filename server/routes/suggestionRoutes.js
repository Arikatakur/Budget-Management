const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestionController');

router.get('/', suggestionController.getSuggestions);
router.post('/', suggestionController.createSuggestion);

module.exports = router;
