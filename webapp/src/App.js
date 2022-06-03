import { useEffect, useRef, useState } from 'react'
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
  const containerRef = useRef()
  const videoRef = useRef()
  const captivePause = useRef(false)

  const [videoStyle, setVideoStyle] = useState({})

  useEffect(() => {
    player.initialize(videoRef.current, manifestURL, true)
    return () => player.reset()
  }, [])

  useEffect(() => {
    const onResize = () =>
      setVideoStyle((prev) => {
        const container = containerRef.current
        const video = videoRef.current
        const width = Math.min(
          container.offsetWidth,
          (container.offsetHeight / video.offsetHeight) *
            video.offsetWidth,
        )
        const height = Math.min(
          container.offsetHeight,
          (container.offsetWidth / video.offsetWidth) * video.offsetHeight,
        )
        if (prev.width !== width || prev.height !== height) {
          return { width, height }
        }
        return prev
      })

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === 'Space' && !videoRef.current.paused) {
        videoRef.current.pause()
        captivePause.current = true
      }
    }
    const onKeyUp = (event) => {
      if (
        event.code === 'Space' &&
        videoRef.current.paused &&
        !captivePause.current
      ) {
        videoRef.current.play()
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
    <div ref={containerRef} style={{ height: '100%', display: 'grid' }}>
      <video
        ref={videoRef}
        controls
        style={{ ...videoStyle, margin: 'auto' }}
      />
    </div>
  )
}
