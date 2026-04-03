const Note = require('../models/Note');
const { validationResult } = require('express-validator');

// @desc    Get all notes for a user (with optional search & tags)
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res, next) => {
  try {
    const { search, tag } = req.query;
    
    let query = { userId: req.user.id };

    if (search) {
      query.$text = { $search: search };
    }

    if (tag) {
      query.tags = tag;
    }

    // Sort by newest first
    const notes = await Note.find(query).sort({ updatedAt: -1 });
    
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }

    const { title, body, tags } = req.body;

    const note = await Note.create({
      title,
      body,
      tags: tags || [],
      userId: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }

    let note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error('Note not found');
    }

    // Make sure the logged in user matches the note user
    if (note.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const { title, body, tags } = req.body;

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, body, tags: tags || [] },
      { new: true, runValidators: true }
    );

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error('Note not found');
    }

    // Make sure the logged in user matches the note user
    if (note.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await note.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Note removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
