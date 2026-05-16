function BiasScore({ result }) {
  const bars = [
    { label: 'Overall bias score', value: result.biasScore, color: '#E24B4A' },
    { label: 'Emotional language', value: result.emotionalScore, color: '#E24B4A' },
    { label: 'Missing sources', value: result.missingSourcesScore, color: '#BA7517' },
    { label: 'Absolute claims', value: result.absoluteClaimsScore, color: '#E24B4A' },
  ]

  return (
    <div style={{
      background: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      <div style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>Bias breakdown</div>
      {bars.map((bar, i) => (
        <div key={i} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '13px', color: '#aaa' }}>{bar.label}</span>
            <span style={{ fontSize: '13px', color: bar.color, fontWeight: '600' }}>{bar.value}%</span>
          </div>
          <div style={{ height: '6px', background: '#333', borderRadius: '4px' }}>
            <div style={{
              height: '6px',
              width: `${bar.value}%`,
              background: bar.color,
              borderRadius: '4px',
              transition: 'width 1s ease'
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BiasScore