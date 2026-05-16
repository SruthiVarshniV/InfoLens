function FactCheckResults({ factChecks }) {
  return (
    <div style={{
      background: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      <div style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Fact-check results</div>
      {factChecks.map((fc, i) => (
        <div key={i} style={{
          display: 'flex',
          gap: '12px',
          paddingBottom: '12px',
          marginBottom: '12px',
          borderBottom: i < factChecks.length - 1 ? '1px solid #2a2a2a' : 'none'
        }}>
          <div style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: fc.color,
            marginTop: '5px',
            flexShrink: 0
          }} />
          <div>
            <div style={{ fontSize: '13px', color: '#aaa', lineHeight: '1.5', marginBottom: '4px' }}>{fc.text}</div>
            <div style={{ fontSize: '11px', color: '#555' }}>
              {fc.source} —
              <span style={{ color: fc.color, fontWeight: '600', marginLeft: '4px' }}>{fc.verdict}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FactCheckResults