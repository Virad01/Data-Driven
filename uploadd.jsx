import React, { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const UploadComponent = () => {
    const [progress, setProgress] = useState(0);

    socket.on('progress', (data) => {
        setProgress(data.totalRecords);
    });

    socket.on('complete', (data) => {
        alert(`Upload complete! Total records: ${data.totalRecords}`);
    });

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <div>Progress: {progress}</div>
        </div>
    );
};

export default UploadComponent;
