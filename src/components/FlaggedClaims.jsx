function FlaggedClaims({ claims }) {
  return (
    <div style={{
      background: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      <div style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Flagged sentences</div>
      {claims.map((claim, i) => (
        <div key={i} style={{
          borderLeft: `3px solid ${claim.level === 'high' ? '#E24B4A' : '#BA7517'}`,
          background: claim.level === 'high' ? '#1a0a0a' : '#1a1400',
          borderRadius: '0 6px 6px 0',
          padding: '10px 12px',
          marginBottom: '8px'
        }}>
          <div style={{ fontSize: '13px', color: claim.level === 'high' ? '#f09595' : '#FAC775', marginBottom: '4px' }}>
            {claim.text}
          </div>
          <div style={{ fontSize: '12px', color: '#555' }}>{claim.reason}</div>
        </div>
      ))}
    </div>
  )
}

export default FlaggedClaims