const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
      </div>
      <div className="note-body">
        <p>{note.body}</p>
      </div>
      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag, index) => (
            <span key={index} className="tag-chip">{tag}</span>
          ))}
        </div>
      )}
      <div className="note-actions">
        <button onClick={() => onEdit(note)} className="btn-edit">Edit</button>
        <button onClick={() => onDelete(note._id)} className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
