import { useState, useRef, useEffect } from 'react';
import './NoteEditor.css';

const NoteEditor = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && note?.content) {
      editorRef.current.innerHTML = note.content;
    }
  }, [note]);

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSave = () => {
    const content = editorRef.current?.innerHTML || '';
    if (!title.trim() && !content.trim()) {
      alert('Please add a title or content');
      return;
    }
    onSave({
      title: title.trim() || 'Untitled',
      content: content.trim() || '',
    });
  };

  return (
    <div className="note-editor">
      <div className="editor-toolbar">
        <button
          onClick={() => handleFormat('bold')}
          className="toolbar-btn"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => handleFormat('italic')}
          className="toolbar-btn"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => handleFormat('underline')}
          className="toolbar-btn"
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => handleFormat('insertUnorderedList')}
          className="toolbar-btn"
          title="Bullet List"
        >
          •
        </button>
      </div>
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="editor-title-input"
      />
      <div
        ref={editorRef}
        contentEditable
        className="editor-content"
        placeholder="Start typing your note..."
      />
      <div className="editor-actions">
        <button onClick={handleSave} className="save-btn">
          Save
        </button>
        <button onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
