import { useState, useEffect } from 'react';
import api from '../services/api';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and Filter State
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEditNote, setCurrentEditNote] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      let url = '/notes';
      const params = [];
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (tag) params.push(`tag=${encodeURIComponent(tag)}`);
      
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      
      const response = await api.get(url);
      setNotes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Delay search to debounce
    const delayDebounceFn = setTimeout(() => {
      fetchNotes();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, tag]);

  const handleCreateNote = async (noteData) => {
    try {
      await api.post('/notes', noteData);
      fetchNotes();
      setIsFormOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating note');
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      await api.put(`/notes/${currentEditNote._id}`, noteData);
      fetchNotes();
      setIsFormOpen(false);
      setCurrentEditNote(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating note');
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${id}`);
        setNotes(notes.filter(n => n._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting note');
      }
    }
  };

  const openCreateForm = () => {
    setCurrentEditNote(null);
    setIsFormOpen(true);
  };

  const openEditForm = (note) => {
    setCurrentEditNote(note);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentEditNote(null);
  };

  return (
    <div className="dashboard-container container">
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <button onClick={openCreateForm} className="btn-primary">
          + New Task
        </button>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          className="tag-filter-input"
          placeholder="Filter by tag..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {isFormOpen && (
        <div className="modal-overlay">
          <NoteForm
            currentNote={currentEditNote}
            onSubmit={currentEditNote ? handleUpdateNote : handleCreateNote}
            onCancel={closeForm}
          />
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">Loading tasks...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Create a new task to get started!</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={openEditForm}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
