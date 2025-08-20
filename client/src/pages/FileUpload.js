import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/files').then(res => setFiles(res.data));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('http://localhost:5000/api/files/upload', formData);
    const res = await axios.get('http://localhost:5000/api/files');
    setFiles(res.data);
  };

  return (
    <div className="container">
      <h2>File Uploads</h2>
      <form onSubmit={handleUpload} style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
        <input type="file" onChange={e => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {files.map(f => <li key={f}>{f}</li>)}
      </ul>
    </div>
  );
}

export default FileUpload;