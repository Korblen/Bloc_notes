// Importe React depuis la bibliothèque 'react'
import React from 'react';

/**
 * Un composant React pour l'entrée de texte Markdown.
 * Props:
 * - note: L'objet note contenant les données à modifier
 * - onTitleChange: Fonction appelée pour gérer les changements de titre de la note
 * - onMarkdownChange: Fonction appelée lors de la modification du texte Markdown
 * - onSave: Fonction appelée lorsque l'utilisateur clique sur le bouton "Save"
 */
function MarkdownInput({ note, onTitleChange, onMarkdownChange, onSave }) {
  return (
    <div>
      {/* Un champ de texte pour entrer du contenu Markdown. */}
      <textarea
        className="form-control mb-3"  // Classes CSS pour le style
        value={note.markdown}          // La valeur du textarea est le contenu Markdown de la note
        onChange={(e) => onMarkdownChange(e.target.value)} // Appelle onMarkdownChange avec la nouvelle valeur à chaque modification de l'input
        rows="10"                      // Définit le nombre de lignes que le textarea occupe visuellement
      />
      {/* Bouton pour sauvegarder les modifications */}
      <button 
        className="btn btn-success"   // Classe CSS pour le style du bouton
        onClick={onSave}              // Déclenche la fonction onSave lorsque le bouton est cliqué
      >
        Save
      </button>
    </div>
  );
}

// Exporte le composant pour permettre son utilisation dans d'autres parties de l'application
export default MarkdownInput; 
