import React, { useState, useEffect } from 'react';
import MarkdownInput from './MarkdownInput';
import NoteDisplay from './NoteDisplay';

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
    setCurrentNoteId(idToSave); // Maintenir l'ID actuel pour les modifications ultérieures
  };

  const handleSelectNote = (id) => {
    setMarkdown(notes[id]);
    setCurrentNoteId(id);
  };

  const handleCreateNewNote = () => {
    setMarkdown(''); // Réinitialiser le markdown pour une nouvelle note
    setCurrentNoteId(null); // Réinitialiser l'ID de note actuelle
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
    <div className="app-container">
      <NoteDisplay markdown={markdown} />
      <MarkdownInput markdown={markdown} onMarkdownChange={handleMarkdownChange} onSave={handleSave} />
      <div>
        {Object.keys(notes).map((id) => (
          <button key={id} onClick={() => handleSelectNote(id)}>
            Note at {new Date(id).toLocaleString()}
          </button>
        ))}
        <button onClick={handleCreateNewNote}>Create New Note</button>
      </div>
      <button onClick={clearNotes}>Clear All Notes</button>
    </div>
  );
}

export default App;
