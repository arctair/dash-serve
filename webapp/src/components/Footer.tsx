export default function Footer() {
  return (
    <div
      style={{
        color: '#CCC',
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: '0.5px solid #CCC',
      }}
    >
      <Block>
        <a
          href="https://snare.cc"
          style={{
            visibility:
              process.env.REACT_APP_GIT_VERSION === 'dev'
                ? 'visible'
                : 'hidden',
            textDecoration: 'none',
            color: '#CCF',
            fontWeight: 'bold',
          }}
        >
          snare.cc
        </a>
      </Block>
      <Block>{process.env.REACT_APP_GIT_VERSION}</Block>
    </div>
  )
}

type BlockProps = { children: React.ReactNode }
function Block({ children }: BlockProps) {
  return (
    <div className="block" style={{ padding: '0 0.25rem' }}>
      {children}
    </div>
  )
}
