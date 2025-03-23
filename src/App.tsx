import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState<string>('')
  
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
    setText(conversionFn(text));
  }
  
  // Clear text
  const clearText = () => {
    setText('');
  }
  
  // Copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
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
        <h1>Penukar Huruf Teks</h1>
      </header>

      <main>
        <div className="text-input-container">
          <textarea
            className="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Masukkan teks anda di sini..."
            rows={8}
          />

          <div className="input-actions">
            <button onClick={clearText} className="action-button">
              Padam
            </button>
            <button onClick={pasteFromClipboard} className="action-button">
              Tampal
            </button>
            <button
              onClick={() => copyToClipboard()}
              className="action-button"
              disabled={!text}
            >
              Salin
            </button>
          </div>
        </div>

        <div className="conversion-buttons">
          <button
            onClick={() => convertCase(toSentenceCase)}
            className="case-button"
          >
            Huruf pertama ayat
          </button>
          <button
            onClick={() => convertCase(toLowerCase)}
            className="case-button"
          >
            huruf kecil
          </button>
          <button
            onClick={() => convertCase(toUpperCase)}
            className="case-button"
          >
            HURUF BESAR
          </button>
          <button
            onClick={() => convertCase(toCapitalizedCase)}
            className="case-button"
          >
            Huruf Besar Setiap Perkataan
          </button>
          <button
            onClick={() => convertCase(toAlternatingCase)}
            className="case-button"
          >
            hUrUf sElAnG-sElI
          </button>
          <button
            onClick={() => convertCase(toTitleCase)}
            className="case-button"
          >
            Huruf Besar Tajuk
          </button>
          <button
            onClick={() => convertCase(toInverseCase)}
            className="case-button"
          >
            hUrUf tErBaLiK
          </button>
        </div>

        <div className="text-stats">
          <div className="stats-box">
            <span className="stats-label">Huruf:</span>
            <span className="stats-value">{stats.chars}</span>
          </div>
          <div className="stats-box">
            <span className="stats-label">Perkataan:</span>
            <span className="stats-value">{stats.words}</span>
          </div>
          <div className="stats-box">
            <span className="stats-label">Ayat:</span>
            <span className="stats-value">{stats.sentences}</span>
          </div>
          <div className="stats-box">
            <span className="stats-label">Baris:</span>
            <span className="stats-value">{stats.lines}</span>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Dibuat dengan 💪 <a href="https://www.neobrutalism.dev/">Neobrutalism</a></p>
        <a href="#" className="donation-link">
          Sokong projek ini
        </a>
      </footer>
    </div>
  );
}

export default App
