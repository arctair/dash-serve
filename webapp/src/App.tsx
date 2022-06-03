import { MutableRefObject, useEffect, useRef, useState } from 'react'
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
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>
  const captivePause = useRef(false)

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const video = videoRef.current!
      if (event.code === 'Space' && !video.paused) {
        video.pause()
        captivePause.current = true
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      const video = videoRef.current!
      if (
        event.code === 'Space' &&
        video.paused &&
        !captivePause.current
      ) {
        video.play()
      }
      captivePause.current = false
    }
    document.addEventListener('keyup', onKeyUp)
    return () => document.removeEventListener('keyup', onKeyUp)
  }, [])

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
