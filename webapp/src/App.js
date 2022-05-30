import { useEffect, useRef } from 'react'
import dashjs from 'dashjs'

const manifestURL = 'https://snare.cc/dash/live.brunchyroll.mpd'
const player = dashjs.MediaPlayer().create()
player.updateSettings({
  streaming: {
    delay: {
      liveDelay: 4,
    },
    liveCatchup: {
      maxDrift: 0,
      playbackRate: 0.5,
      latencyThreshold: 60,
    },
  },
})

export default function App() {
  const ref = useRef()
  useEffect(() => {
    player.initialize(ref.current, manifestURL, true)
  }, [])
  return (
    <video
      ref={ref}
      controls
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
