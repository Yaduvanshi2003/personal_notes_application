const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

// All note routes are protected
router.use(protect);

router.route('/')
  .get(getNotes)
  .post([
    body('title', 'Title is required').not().isEmpty(),
    body('title', 'Title cannot be more than 100 characters').isLength({ max: 100 }),
    body('body', 'Body is required').not().isEmpty()
  ], createNote);

router.route('/:id')
  .put([
    body('title', 'Title is required').not().isEmpty(),
    body('title', 'Title cannot be more than 100 characters').isLength({ max: 100 }),
    body('body', 'Body is required').not().isEmpty()
  ], updateNote)
  .delete(deleteNote);

module.exports = router;
