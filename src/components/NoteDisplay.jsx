// Importe React depuis la bibliothèque 'react'
import React from 'react';
// Importe Showdown, une bibliothèque pour convertir le markdown en HTML
import Showdown from 'showdown';

/**
 * Un composant React pour afficher une note en format HTML à partir du markdown.
 * Props:
 * - markdown: Le contenu de la note en markdown
 * - title: Le titre de la note en markdown
 */
function NoteDisplay({ markdown, title }) {
  // Crée un nouveau convertisseur Showdown pour convertir le markdown en HTML
  const converter = new Showdown.Converter();
  // Convertit le titre de markdown à HTML pour éviter des conflits avec les balises HTML natives
  const convertedTitle = converter.makeHtml(title);
  // Convertit le contenu markdown en HTML
  const convertedMarkdown = converter.makeHtml(markdown);

  // Concatène le titre et le contenu convertis en une seule chaîne HTML
  const combinedHtml = `<h1>${convertedTitle}</h1>${convertedMarkdown}`;

  // Rendu du contenu HTML en utilisant 'dangerouslySetInnerHTML' pour insérer le HTML
  return <div dangerouslySetInnerHTML={{ __html: combinedHtml }} />;
}

// Exporte le composant pour permettre son utilisation dans d'autres parties de l'application
export default NoteDisplay;
