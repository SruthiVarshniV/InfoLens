import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import BiasScore from '../components/BiasScore.jsx'
import FlaggedClaims from '../components/FlaggedClaims.jsx'
import FactCheckResults from '../components/FactCheckResults.jsx'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const articleText = location.state?.articleText || ''

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [step, setStep] = useState('Reading article...')

  const steps = [
    'Reading article...',
    'Detecting emotional language...',
    'Checking for missing sources...',
    'Running AI analysis...',
    'Building your report...'
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i < steps.length) setStep(steps[i])
    }, 1000)

    axios.post('https://infolens-506a.onrender.com/analyze', {
      text: articleText,
      url: ''
    })
      .then(res => {
        clearInterval(interval)
        setResult(res.data)
        setLoading(false)
      })
      .catch(err => {
        clearInterval(interval)
        setError('Something went wrong. Please try again.')
        setLoading(false)
      })

    return () => clearInterval(interval)
  }, [])

  const getVerdictColor = (verdict) => {
    if (verdict === 'Likely misinformation') return '#E24B4A'
    if (verdict === 'Possibly biased') return '#BA7517'
    return '#639922'
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        width: '36px', height: '36px',
        border: '3px solid #333',
        borderTop: '3px solid #ffffff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginBottom: '20px'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ color: '#888', fontSize: '14px' }}>{step}</div>
    </div>
  )

  if (error) return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ color: '#E24B4A', fontSize: '16px', marginBottom: '16px' }}>{error}</div>
      <button onClick={() => navigate('/')} style={{
        background: '#fff', color: '#000', border: 'none',
        padding: '10px 24px', borderRadius: '8px', cursor: 'pointer'
      }}>Try again</button>
    </div>
  )

  const verdictColor = getVerdictColor(result.verdict)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      padding: '40px 20px',
      fontFamily: 'system-ui, sans-serif',
      color: '#ffffff'
    }}>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>

        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', color: '#888',
          fontSize: '14px', cursor: 'pointer', marginBottom: '24px', padding: '0'
        }}>← Analyze another</button>

        <div style={{
          background: '#1e1e1e', border: '1px solid #333',
          borderRadius: '10px', padding: '14px',
          fontSize: '13px', color: '#aaa',
          marginBottom: '20px', lineHeight: '1.6'
        }}>
          <span style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Article analyzed</span>
          <p style={{ marginTop: '6px' }}>
            {articleText.length > 200 ? articleText.slice(0, 200) + '...' : articleText}
          </p>
        </div>

        <div style={{
          display: 'inline-block',
          background: verdictColor + '22',
          border: `1px solid ${verdictColor}`,
          color: verdictColor,
          padding: '6px 16px', borderRadius: '20px',
          fontSize: '13px', fontWeight: '600', marginBottom: '20px'
        }}>
          {result.verdict}
        </div>

        <BiasScore result={{
          biasScore: result.biasScore,
          emotionalScore: result.emotionalScore,
          missingSourcesScore: result.missingSourcesScore,
          absoluteClaimsScore: result.absoluteClaimsScore
        }} />

        <div style={{
          background: '#1e1e1e', border: '1px solid #333',
          borderRadius: '10px', padding: '16px', marginBottom: '16px',
          fontSize: '14px', color: '#aaa', lineHeight: '1.7'
        }}>
          <div style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>AI summary</div>
          {result.summary}
        </div>

        <FlaggedClaims claims={result.flaggedClaims} />
        <FactCheckResults factChecks={result.factChecks} />

        <p style={{ fontSize: '12px', color: '#444', textAlign: 'center', marginTop: '24px', lineHeight: '1.6' }}>
          InfoLens is a research assistant, not a verdict machine. We surface the evidence — the final judgment is always yours.
        </p>

      </div>
    </div>
  )
}

export default Results
