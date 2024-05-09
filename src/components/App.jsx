import React, { useState, useEffect } from 'react';
import MarkdownInput from './MarkdownInput';
import NoteDisplay from './NoteDisplay';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  // Gestion des états pour une note individuelle, la collection des notes, et l'ID de la note actuellement sélectionnée
  const [note, setNote] = useState({ title: '', markdown: '' });
  const [notes, setNotes] = useState({});
  const [currentNoteId, setCurrentNoteId] = useState(null);

  // Charge les notes du localStorage au premier montage du composant
  useEffect(() => {
    loadNotes();
  }, []);

  // Met à jour le markdown de la note actuelle lorsque l'utilisateur modifie le contenu markdown
  const handleMarkdownChange = (markdown) => {
    setNote(prevNote => ({ ...prevNote, markdown }));
  };

  // Met à jour le titre de la note actuelle lorsque l'utilisateur modifie le titre
  const handleTitleChange = (title) => {
    setNote(prevNote => ({ ...prevNote, title }));
  };

  // Sauvegarde la note actuelle dans le localStorage et met à jour la liste des notes
  const handleSave = () => {
    const idToSave = currentNoteId || new Date().toISOString(); // Utilise l'ID actuel ou génère un nouvel ID basé sur le timestamp
    localStorage.setItem(idToSave, JSON.stringify(note)); // Sauvegarde la note dans le localStorage
    loadNotes(); // Recharge les notes depuis le localStorage
    setCurrentNoteId(idToSave); // Met à jour l'ID de la note actuelle
  };

  // Sélectionne une note pour l'affichage et la modification
  const handleSelectNote = (id) => {
    const selectedNote = JSON.parse(notes[id]); // Parse la note sélectionnée depuis le localStorage
    setNote(selectedNote); // Met à jour l'état de la note actuelle
    setCurrentNoteId(id); // Met à jour l'ID de la note actuellement sélectionnée
  };

  // Crée une nouvelle note vide
  const handleCreateNewNote = () => {
    setNote({ title: '', markdown: '' }); // Réinitialise l'état de la note
    setCurrentNoteId(null); // Aucune note n'est actuellement sélectionnée
  };

  // Efface toutes les notes du localStorage et réinitialise l'état
  const clearNotes = () => {
    localStorage.clear(); // Efface le localStorage
    setNotes({}); // Réinitialise l'état des notes
    setNote({ title: '', markdown: '' }); // Réinitialise l'état de la note actuelle
    setCurrentNoteId(null); // Aucune note n'est actuellement sélectionnée
  };

  // Charge les notes depuis le localStorage
  const loadNotes = () => {
    let loadedNotes = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i); // Obtient la clé de chaque entrée du localStorage
      loadedNotes[key] = localStorage.getItem(key); // Stocke la valeur de chaque note dans l'objet loadedNotes
    }
    setNotes(loadedNotes); // Met à jour l'état des notes avec les notes chargées
  };
    // Code JSX pour l'interface utilisateur ici (non inclus dans le commentaire pour rester succinct)


  // Fonction pour déplacer une note en utilisant le drag and drop (glisser-déposer)
const moveNote = (dragIndex, hoverIndex) => {
  // Récupère la note qui est actuellement glissée selon son index
  const dragNote = notes[Object.keys(notes)[dragIndex]];
  // Crée une copie des clés de toutes les notes pour réarrangement
  const newNotesOrder = Object.keys(notes);
  // Enlève la note glissée de sa position actuelle
  newNotesOrder.splice(dragIndex, 1);
  // Insère la note à la nouvelle position où elle a été déposée
  newNotesOrder.splice(hoverIndex, 0, Object.keys(notes)[dragIndex]);

  // Crée un nouvel objet pour stocker les notes réarrangées
  const newNotes = {};
  newNotesOrder.forEach((key) => {
    newNotes[key] = notes[key];
  });
  // Met à jour l'état des notes avec le nouvel ordre
  setNotes(newNotes);
  // Met à jour le localStorage pour refléter le nouvel ordre des notes
  localStorage.clear();
  Object.keys(newNotes).forEach(key => {
    localStorage.setItem(key, newNotes[key]);
  });
};

// Composant principal de l'application
return (
  // Fournit un contexte pour le drag and drop
  <DndProvider backend={HTML5Backend}>
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <div className="list-group">
            {/* Mappe chaque note pour la rendre draggable et affiche son titre et sa date */}
            {Object.keys(notes).map((id, index) => (
              <DraggableNote 
                id={id} 
                index={index} 
                moveNote={moveNote} 
                handleSelectNote={handleSelectNote}
                key={id} 
                title={JSON.parse(notes[id]).title || 'Untitled'} 
                date={new Date(id).toLocaleString()}
              />
            ))}
          </div>
          {/* Boutons pour créer une nouvelle note et pour effacer toutes les notes */}
          <button className="btn btn-primary mt-2" onClick={handleCreateNewNote}>Create New Note</button>
          <button className="btn btn-danger mt-2" onClick={clearNotes}>Clear All Notes</button>
        </div>
        <div className="col-md-8">
          {/* Affiche la note sélectionnée et permet son édition */}
          <NoteDisplay markdown={note.markdown} title={note.title} />
          <input 
            type="text" 
            value={note.title} 
            onChange={(e) => handleTitleChange(e.target.value)} 
            placeholder="Note Title" 
            className="form-control mb-2"
          />
          {/* Component pour entrer le markdown et sauvegarder les modifications */}
          <MarkdownInput note={note} onMarkdownChange={handleMarkdownChange} onSave={handleSave} />
        </div>
      </div>
    </div>
  </DndProvider>
);
}


function DraggableNote({ id, title, date, index, moveNote, handleSelectNote }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'note',
    item: { id, index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        handleSelectNote(id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, index]);

  return (
    <div 
      ref={drag}
      className="list-group-item list-group-item-action"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => handleSelectNote(id)}
    >
      {title} - {date}
    </div>
  );
}
export default App;
