export default function Footer() {
  return (
    <div
      style={{
        color: '#CCC',
        textAlign: 'right',
        padding: '0.125rem 0.5rem',
        borderTop: '0.5px solid #CCC',
      }}
    >
      {process.env.REACT_APP_GIT_VERSION}
    </div>
  )
}
