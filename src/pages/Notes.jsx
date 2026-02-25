import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteEditor from '../components/NoteEditor';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [searchQuery, notes]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getNotes();
      setNotes(data || []);
    } catch (err) {
      setError('Failed to load notes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterNotes = () => {
    if (!searchQuery.trim()) {
      setFilteredNotes(notes);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = notes.filter(
      (note) =>
        (note.title && note.title.toLowerCase().includes(query)) ||
        (note.content && note.content.toLowerCase().includes(query))
    );
    setFilteredNotes(filtered);
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = async (noteData) => {
    try {
      setError('');
      if (editingNote) {
        await updateNote(editingNote.id, noteData);
      } else {
        await createNote(noteData);
      }
      setShowEditor(false);
      setEditingNote(null);
      await loadNotes();
    } catch (err) {
      setError('Failed to save note. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      setError('');
      await deleteNote(noteId);
      await loadNotes();
    } catch (err) {
      setError('Failed to delete note. Please try again.');
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingNote(null);
  };

  return (
    <div className="notes-page">
      <Navbar />
      <div className="notes-container">
        <div className="notes-header">
          <h2>My Notes</h2>
          <button onClick={handleCreateNote} className="create-note-btn">
            + New Note
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : showEditor ? (
          <NoteEditor
            note={editingNote}
            onSave={handleSaveNote}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div className="notes-grid">
            {filteredNotes.length === 0 ? (
              <div className="empty-state">
                {searchQuery
                  ? 'No notes match your search.'
                  : 'No notes yet. Create your first note!'}
              </div>
            ) : (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
