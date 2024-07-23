import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./styles/BlogAdd.css";

function QuillEditor({ onDataTransfer, initialContent, readOnly }) {
    const [value, setValue] = useState('');
    useEffect(() => {
        setValue(initialContent);
    }, [initialContent]);

    const handleQuillChange = (value) => {
        if (!readOnly) {
            setValue(value);
            onDataTransfer(value);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ],
    };

    return <ReactQuill theme="snow" value={value} onChange={handleQuillChange} modules={modules} readOnly={readOnly} className="quillEditor" />;
}

export default QuillEditor;