import { useEffect, useRef } from 'react'
import dashjs from 'dashjs'

const manifestURL = 'https://dash.snare.cc/live.brunchyroll.mpd'
const player = dashjs.MediaPlayer().create()
player.updateSettings({
  streaming: {
    delay: {
      liveDelay: 4,
    },
    liveCatchup: {
      maxDrift: 0,
      playbackRate: 0.125,
      latencyThreshold: 60,
    },
  },
})

export default function App() {
  const ref = useRef()
  const captivePause = useRef(false)
  useEffect(() => {
    player.initialize(ref.current, manifestURL, true)
    return () => player.reset()
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === 'Space' && !ref.current.paused) {
        ref.current.pause()
        captivePause.current = true
      }
    }
    const onKeyUp = (event) => {
      if (
        event.code === 'Space' &&
        ref.current.paused &&
        !captivePause.current
      ) {
        ref.current.play()
      }
      captivePause.current = false
    }
    document.addEventListener('keyup', onKeyUp)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('keydown', onKeyDown)
    }
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
