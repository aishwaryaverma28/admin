import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./styles/BlogAdd.css";

function CRMeditor({ onDataTransfer, initialContent, readOnly }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initialContent);
  }, [initialContent]);

  const handleQuillChange = (value) => {
    setValue(value);
    if (!readOnly) {
      onDataTransfer(value); 
    }
  };

  const modules = {
    toolbar: readOnly ? false : [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ],
  };

  return <ReactQuill theme="snow" value={value} onChange={handleQuillChange} modules={modules} readOnly={readOnly} className="quillEditor"/>;
}

export default CRMeditor;
