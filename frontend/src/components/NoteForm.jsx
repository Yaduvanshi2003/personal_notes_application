import { useState, useEffect } from 'react';

const NoteForm = ({ currentNote, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setBody(currentNote.body);
      setTagsInput(currentNote.tags ? currentNote.tags.join(', ') : '');
    } else {
      setTitle('');
      setBody('');
      setTagsInput('');
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    onSubmit({ title, body, tags });
  };

  return (
    <div className="note-form-card component-card">
      <h2>{currentNote ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength="100"
          />
        </div>
        <div className="form-group">
          <label>Task</label>
          <textarea
            className="form-control"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. work, personal, idea"
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">
            {currentNote ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
