import React, { useState, useEffect } from 'react';
import MarkdownInput from './MarkdownInput';
import NoteDisplay from './NoteDisplay';
import Showdown from 'showdown';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [notes, setNotes] = useState({});
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleSave = () => {
    const idToSave = currentNoteId || new Date().toISOString();
    localStorage.setItem(idToSave, markdown);
    loadNotes();
    setCurrentNoteId(idToSave);
  };

  const handleSelectNote = (id) => {
    setMarkdown(notes[id]);
    setCurrentNoteId(id);
  };

  const handleCreateNewNote = () => {
    setMarkdown('');
    setCurrentNoteId(null);
  };

  const clearNotes = () => {
    localStorage.clear();
    setNotes({});
    setMarkdown('');
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
                Note at {new Date(id).toLocaleString()}
              </button>
            ))}
          </div>
          <button className="btn btn-primary mt-2" onClick={handleCreateNewNote}>Create New Note</button>
          <button className="btn btn-danger mt-2" onClick={clearNotes}>Clear All Notes</button>
        </div>
        <div className="col-md-8">
          <MarkdownInput markdown={markdown} onMarkdownChange={handleMarkdownChange} onSave={handleSave} />
          <NoteDisplay markdown={markdown} />
        </div>
      </div>
    </div>
  );
}

export default App;
