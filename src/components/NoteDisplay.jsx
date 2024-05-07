import React from 'react';
import Showdown from 'showdown';

function NoteDisplay({ markdown }) {
  const converter = new Showdown.Converter();
  const html = converter.makeHtml(markdown);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default NoteDisplay;