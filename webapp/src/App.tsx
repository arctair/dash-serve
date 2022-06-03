import { MutableRefObject, useEffect, useRef, useState } from 'react'
import dashjs from 'dashjs'
import usePauseControls from './components/usePauseControls'

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
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>

  const [videoSize, setVideoSize] = useState<{
    width?: number
    height?: number
  }>({})

  useEffect(() => {
    player.initialize(videoRef.current!, manifestURL, true)
    return () => player.reset()
  }, [])

  useEffect(() => {
    const onResize = () =>
      setVideoSize((prev) => {
        const container = containerRef.current!
        const video = videoRef.current!
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

  usePauseControls({ video: videoRef.current! })

  return (
    <div ref={containerRef} style={{ height: '100%', display: 'grid' }}>
      <video
        ref={videoRef}
        controls
        style={{ ...videoSize, margin: 'auto' }}
      />
    </div>
  )
}
