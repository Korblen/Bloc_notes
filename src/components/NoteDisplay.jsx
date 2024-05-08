import React from 'react';
import Showdown from 'showdown';

function NoteDisplay({ markdown, title }) {
  const converter = new Showdown.Converter();
  const convertedTitle = converter.makeHtml(title); // Renommé pour éviter le conflit
  const convertedMarkdown = converter.makeHtml(markdown);

  // Concaténation du titre et du contenu en un seul HTML
  const combinedHtml = `<h1>${convertedTitle}</h1>${convertedMarkdown}`;

  return <div dangerouslySetInnerHTML={{ __html: combinedHtml }} />;
}

export default NoteDisplay;
