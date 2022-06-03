import Footer from './components/Footer'
import Player from './components/Player'

export default function App() {
  return (
    <div
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: '1', overflow: 'hidden' }}>
        <Player />
      </div>
      <div style={{ flex: '0' }}>
        <Footer />
      </div>
    </div>
  )
}
