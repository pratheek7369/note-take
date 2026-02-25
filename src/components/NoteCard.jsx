import './NoteCard.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title || 'Untitled'}</h3>
        <div className="note-actions">
          <button
            onClick={() => onEdit(note)}
            className="edit-btn"
            aria-label="Edit note"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="delete-btn"
            aria-label="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      <div
        className="note-content"
        dangerouslySetInnerHTML={{ __html: note.content || '' }}
      />
    </div>
  );
};

export default NoteCard;
