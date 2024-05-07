import React from 'react';

function MarkdownInput({ markdown, onMarkdownChange, onSave }) {
  return (
    <div>
      <textarea value={markdown} onChange={onMarkdownChange} />
      <button onClick={onSave}>Save</button>
    </div>
  );
}

export default MarkdownInput;