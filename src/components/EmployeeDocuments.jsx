import React from 'react'
import ViewProfile from './ViewProfile'

const EmployeeDocuments = () => {
  return (
    <>
    <ViewProfile/>
    <div>EmployeeDocuments</div>
    </>
  )
}

export default EmployeeDocuments
// import React, { useState } from 'react';
// import ViewProfile from './ViewProfile'


// const EmployeeProfile = () => {
//     const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [uploadedDocumentUrl, setUploadedDocumentUrl] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (file) {
//       const formData = new FormData();
//       formData.append('document', file);

//       // Make API request to upload the document
//       // Replace `API_ENDPOINT` with the actual endpoint URL
//       fetch('API_ENDPOINT', {
//         method: 'POST',
//         body: formData
//       })
//         .then(response => {
//           // Handle the API response
//           if (response.ok) {
//             setUploadStatus('Uploaded successfully!');
//             return response.json();
//           } else {
//             setUploadStatus('Upload failed.');
//             throw new Error('Upload failed');
//           }
//         })
//         .then(data => {
//           // Store the uploaded document URL
//           setUploadedDocumentUrl(data.documentUrl);
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
//     }
//   };

//   const handleViewDocument = () => {
//     window.open(uploadedDocumentUrl, '_blank');
//   };

//   return (
//     <>
//     <ViewProfile/>
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       {uploadStatus && <p>{uploadStatus}</p>}
//       {uploadedDocumentUrl && (
//         <button onClick={handleViewDocument}>View Document</button>
//       )}
//     </div>
//     </>
//   )
// }

// export default EmployeeProfile
