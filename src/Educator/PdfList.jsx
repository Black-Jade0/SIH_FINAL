import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { BASE_URL } from '../../config';
import { BACKENDBASEURL } from '../../config';

const PdfList = () => {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                
                const response = await axios.get(BASE_URL+'/edu/pdfs',{
                    withCredentials:true
                })
                setPdfs(response.data);
            } catch (error) {
                console.error('Error fetching PDFs:', error);
            }
        };

        fetchPdfs();
    }, []);

    const handleDownload = async (id, name) => {
        const response = await axios.get(`${BACKENDBASEURL}/edu/pdfs/${id}`, {
            responseType: 'blob', // Ensures the response is treated as binary data
            withCredentials: true,
        });
        console.log("response from backend: ",response.data)
        const blob = response.data.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
    };

    return (
        <div>
            <ul>
                {pdfs.map((pdf) => (
                    <li key={pdf.id}>
                        <span>{pdf.name}</span>
                      <div>Subject: <span>{pdf.subject}</span></div> 
                       Level: <span>{pdf.level}</span>
                        <button onClick={() => handleDownload(pdf.id, pdf.name)}>Download</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PdfList;
