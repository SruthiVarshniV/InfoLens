import { useNavigate } from 'react-router-dom'
import InputForm from '../components/InputForm.jsx'

function Home() {
  const navigate = useNavigate()

  const handleAnalyze = (text) => {
    navigate('/results', { state: { articleText: text } })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '620px' }}>
        <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '6px' }}>
          InfoLens
        </h1>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '28px' }}>
          Analyze any article, link or content instantly. We present the evidence — you decide what to believe.
        </p>
        <InputForm onAnalyze={handleAnalyze} />
      </div>
    </div>
  )
}

export default Home