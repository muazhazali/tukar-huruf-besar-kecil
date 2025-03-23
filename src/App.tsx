import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  
  // Text conversion functions
  const toSentenceCase = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  
  const toUpperCase = (text: string) => text.toUpperCase();
  
  const toLowerCase = (text: string) => text.toLowerCase();
  
  const toCapitalizedCase = (text: string) => {
    if (!text) return '';
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }
  
  const toAlternatingCase = (text: string) => {
    if (!text) return '';
    return text.split('').map((char, i) => 
      i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
    ).join('');
  }
  
  const toTitleCase = (text: string) => {
    if (!text) return '';
    return text.toLowerCase().split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  const toInverseCase = (text: string) => {
    if (!text) return '';
    return text.split('').map(char => 
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    ).join('');
  }
  
  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }
  
  // Handle case conversion
  const convertCase = (conversionFn: (text: string) => string) => {
    setOutput(conversionFn(text));
  }
  
  // Clear text
  const clearText = () => {
    setText('');
    setOutput('');
  }
  
  // Copy text to clipboard
  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
  }
  
  // Paste from clipboard
  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error);
    }
  }
  
  // Text statistics
  const getTextStats = () => {
    const chars = text.length;
    const words = text ? text.trim().split(/\s+/).length : 0;
    const sentences = text ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
    
    return { chars, words, sentences, lines };
  }
  
  const stats = getTextStats();
  
  return (
    <div className="app-container">
      <header className="header">
        <h1>Text Case Converter</h1>
      </header>
      
      <main>
        <div className="text-input-container">
          <textarea 
            className="text-input" 
            value={text} 
            onChange={handleTextChange} 
            placeholder="Enter your text here..."
            rows={8}
          />
          
          <div className="input-actions">
            <button onClick={clearText} className="action-button">Clear</button>
            <button onClick={pasteFromClipboard} className="action-button">Paste</button>
          </div>
        </div>
        
        <div className="conversion-buttons">
          <button onClick={() => convertCase(toSentenceCase)} className="case-button">Sentence case</button>
          <button onClick={() => convertCase(toLowerCase)} className="case-button">lowercase</button>
          <button onClick={() => convertCase(toUpperCase)} className="case-button">UPPERCASE</button>
          <button onClick={() => convertCase(toCapitalizedCase)} className="case-button">Capitalized Case</button>
          <button onClick={() => convertCase(toAlternatingCase)} className="case-button">aLtErNaTiNg cAsE</button>
          <button onClick={() => convertCase(toTitleCase)} className="case-button">Title Case</button>
          <button onClick={() => convertCase(toInverseCase)} className="case-button">InVeRsE CaSe</button>
        </div>
        
        <div className="output-container">
          <div className="output-header">
            <h2>Output</h2>
            <button 
              onClick={() => copyToClipboard(output)} 
              className="copy-button"
              disabled={!output}
            >
              Copy
            </button>
          </div>
          
          <div className="output-display">
            {output || "Converted text will appear here..."}
          </div>
        </div>
        
        <div className="text-stats">
          <div className="stats-box">
            <span className="stats-label">Characters:</span>
            <span className="stats-value">{stats.chars}</span>
          </div>
          <div className="stats-box">
            <span className="stats-label">Words:</span>
            <span className="stats-value">{stats.words}</span>
          </div>
          <div className="stats-box">
            <span className="stats-label">Sentences:</span>
            <span className="stats-value">{stats.sentences}</span>
          </div>
          <div className="stats-box">
            <span className="stats-label">Lines:</span>
            <span className="stats-value">{stats.lines}</span>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <p>Made with 💪 Neobrutalism</p>
        <a href="#" className="donation-link">Support this project</a>
      </footer>
    </div>
  )
}

export default App
