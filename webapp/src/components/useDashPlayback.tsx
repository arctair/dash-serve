import { MutableRefObject, useEffect, useRef, useState } from 'react'
import dashjs from 'dashjs'

export default function useDashPlayback(manifestURL: string) {
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>
  const [version, setVersion] = useState(0)

  useEffect(() => {
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

    player.initialize(videoRef.current!, manifestURL, true)
    return () => player.destroy()
  }, [manifestURL, version])

  return {
    setVideoRef: (video: HTMLVideoElement | null) => {
      if (video && videoRef.current !== video) {
        videoRef.current = video
        setVersion((version) => version + 1)
      }
    },
  }
}
