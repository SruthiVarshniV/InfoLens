import { useState } from 'react'

function InputForm({ onAnalyze }) {
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [mode, setMode] = useState('text')

  const handleSubmit = () => {
    const content = mode === 'text' ? text : url
    if (!content.trim()) return alert('Please enter an article or URL first!')
    onAnalyze(content)
  }

  return (
    <div>
      {/* Toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setMode('text')}
          style={{
            padding: '8px 18px',
            borderRadius: '20px',
            border: 'none',
            background: mode === 'text' ? '#ffffff' : '#1e1e1e',
            color: mode === 'text' ? '#000000' : '#888',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: mode === 'text' ? '600' : '400'
          }}>
          Paste text
        </button>
        <button
          onClick={() => setMode('url')}
          style={{
            padding: '8px 18px',
            borderRadius: '20px',
            border: 'none',
            background: mode === 'url' ? '#ffffff' : '#1e1e1e',
            color: mode === 'url' ? '#000000' : '#888',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: mode === 'url' ? '600' : '400'
          }}>
          Enter URL
        </button>
      </div>

      {/* Input */}
      {mode === 'text' ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the full article text here..."
          style={{
            width: '100%',
            height: '180px',
            background: '#1e1e1e',
            border: '1px solid #333',
            borderRadius: '10px',
            padding: '14px',
            color: '#ffffff',
            fontSize: '14px',
            resize: 'none',
            outline: 'none',
            fontFamily: 'system-ui, sans-serif',
            boxSizing: 'border-box'
          }}
        />
      ) : (
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/article..."
          style={{
            width: '100%',
            background: '#1e1e1e',
            border: '1px solid #333',
            borderRadius: '10px',
            padding: '14px',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none',
            fontFamily: 'system-ui, sans-serif',
            boxSizing: 'border-box'
          }}
        />
      )}

      {/* Button */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: '14px',
          width: '100%',
          padding: '14px',
          background: '#ffffff',
          color: '#000000',
          border: 'none',
          borderRadius: '10px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
        Analyze article
      </button>
    </div>
  )
}

export default InputForm