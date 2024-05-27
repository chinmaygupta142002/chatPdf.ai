import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
import PdfUploader from './PdfUploader';


function App() {
  const [pdfText, setPdfText] = React.useState('');
  const [prompt, setPrompt] = React.useState("");
  const [prompts, setPrompts] = React.useState([]);

  function handleChange(event) {
    setPrompt(event.target.value);
  }

  function handleSubmit() {
    if(pdfText.length === 0){
      alert("Choose a valid PDF file");
      return;
    }
    if(prompt === ""){
      alert("Invalid Prompt");
      return;
    }
    axios.post("http://localhost:5000/", { prompt: pdfText+prompt }).then(
      result => {
        setPrompts(prevPrompts => [...prevPrompts, {prompt: prompt, reply: result.data}]);
      }
    );
  }

  useEffect(() => {
    console.log(prompts);
  }, [prompts]);

  useEffect(() => {
    setPrompts([]);
  }, [pdfText]);


  return (
    <div>
    <div className="left-align">
      <PdfUploader setPdfText={setPdfText} />
      <br />
    </div>
    <div className="chat-container">
      <div className="chat-bot">
        <div className="info-container">
          <h2>Chatbot</h2>
        </div>
        <div className="feed">
          {prompts.map((item, index) => (
            <div key={index}>
              <div className="bubble question">
                <strong>Prompt:</strong> {item.prompt}
              </div>
              <div className="bubble response">
                <strong>Reply:</strong> {item.reply}
              </div>
            </div>
          ))}
        </div>
        <textarea 
          placeholder="Message Chatbot" 
          onChange={handleChange} 
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </div>
  );
}

export default App;




