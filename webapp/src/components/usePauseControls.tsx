import { useEffect, useRef } from 'react'

type usePauseControlsProps = { video: HTMLVideoElement }
export default function usePauseControls({
  video,
}: usePauseControlsProps) {
  const captivePause = useRef(false)
  useEffect(() => {
    if (!video) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !video.paused) {
        video.pause()
        captivePause.current = true
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [video])

  useEffect(() => {
    if (!video) return

    const onKeyUp = (event: KeyboardEvent) => {
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
  }, [video])
}
