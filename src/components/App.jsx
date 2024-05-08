import React, { useState, useEffect } from 'react';
import MarkdownInput from './MarkdownInput';
import NoteDisplay from './NoteDisplay';

function App() {
  const [note, setNote] = useState({ title: '', markdown: '' });
  const [notes, setNotes] = useState({});
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const handleMarkdownChange = (markdown) => {
    setNote(prevNote => ({ ...prevNote, markdown }));
  };

  const handleTitleChange = (title) => {
    setNote(prevNote => ({ ...prevNote, title }));
  };

  const handleSave = () => {
    const idToSave = currentNoteId || new Date().toISOString();
    localStorage.setItem(idToSave, JSON.stringify(note));
    loadNotes();
    setCurrentNoteId(idToSave);
  };

  const handleSelectNote = (id) => {
    const selectedNote = JSON.parse(notes[id]);
    setNote(selectedNote);
    setCurrentNoteId(id);
  };

  const handleCreateNewNote = () => {
    setNote({ title: '', markdown: '' });
    setCurrentNoteId(null);
  };

  const clearNotes = () => {
    localStorage.clear();
    setNotes({});
    setNote({ title: '', markdown: '' });
    setCurrentNoteId(null);
  };

  const loadNotes = () => {
    let loadedNotes = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      loadedNotes[key] = localStorage.getItem(key);
    }
    setNotes(loadedNotes);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <div className="list-group">
            {Object.keys(notes).map((id) => (
              <button key={id} className="list-group-item list-group-item-action" onClick={() => handleSelectNote(id)}>
                {JSON.parse(notes[id]).title || 'Untitled'} - {new Date(id).toLocaleString()}
              </button>
            ))}
          </div>
          <button className="btn btn-primary mt-2" onClick={handleCreateNewNote}>Create New Note</button>
          <button className="btn btn-danger mt-2" onClick={clearNotes}>Clear All Notes</button>
        </div>
        <div className="col-md-8">
        <NoteDisplay markdown={note.markdown} title={note.title} />
          <input 
            type="text" 
            value={note.title} 
            onChange={(e) => handleTitleChange(e.target.value)} 
            placeholder="Note Title" 
            className="form-control mb-2"
          />
          <MarkdownInput note={note} onMarkdownChange={handleMarkdownChange} onSave={handleSave} />

        </div>
      </div>
    </div>
  );
}

export default App;
