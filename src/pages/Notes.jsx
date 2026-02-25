// src/pages/Notes.jsx
import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api.jsx';
import { removeToken, getUserId } from '../utils/auth.jsx';
import { useNavigate } from 'react-router-dom';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const userId = getUserId();

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    // Search by title only
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      const userNotes = data.filter((note) => note.user === userId);
      setNotes(userNotes);
      setFilteredNotes(userNotes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login', { replace: true });
  };

  const handleAddNote = async () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    try {
      await createNote({ title: newNoteTitle, content: newNoteContent, user: userId });
      setNewNoteTitle('');
      setNewNoteContent('');
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditNote = async (id) => {
    const updatedTitle = prompt('Enter new title:');
    const updatedContent = prompt('Enter new content:');
    if (!updatedTitle || !updatedContent) return;
    try {
      await updateNote(id, { title: updatedTitle, content: updatedContent, user: userId });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="notes-page">
      <header className="notes-header">
        <input
          type="text"
          placeholder="Search by title..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <section className="new-note-section">
        <input
          type="text"
          placeholder="Note title"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />
        <textarea
          placeholder="Note content"
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </section>

      <section className="notes-grid">
        {filteredNotes.length === 0 && <p className="no-notes">No notes found</p>}
        {filteredNotes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
              <button onClick={() => handleEditNote(note.id)}>Edit</button>
              <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Notes;