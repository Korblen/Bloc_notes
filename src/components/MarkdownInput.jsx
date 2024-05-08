import React from 'react';

function MarkdownInput({ note, onTitleChange, onMarkdownChange, onSave }) {
  return (
    <div>
      <textarea 
        className="form-control mb-3"
        value={note.markdown} 
        onChange={(e) => onMarkdownChange(e.target.value)} 
        rows="10"
      />
      <button className="btn btn-success" onClick={onSave}>Save</button>
    </div>
  );
}

export default MarkdownInput;