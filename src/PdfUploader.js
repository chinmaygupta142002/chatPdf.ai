import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

const PdfUploader = ({ setPdfText }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name); // Set the filename here
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const text = await extractTextFromPdf(pdf);
        setPdfText(text);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const extractTextFromPdf = async (pdf) => {
    const textArray = [];
    const numPages = pdf.numPages;
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      textArray.push(pageText);
    }
    return textArray.join('\n');
  };

  return (
    <div>
      <h1 style={{ fontSize: "70px" }}>
        chatPdf.ai
      </h1>
      <h1>Upload PDF</h1><br />
      <label htmlFor="pdf-upload" style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
        Choose a PDF file
      </label>
      <input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
      {<p>{fileName}</p>}
    </div>
  );
};

export default PdfUploader;










