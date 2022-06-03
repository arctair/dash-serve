import { MutableRefObject, useEffect, useRef, useState } from 'react'

export default function useFitToScreen() {
  const [videoSize, setVideoSize] = useState<{
    width?: number
    height?: number
  }>({})
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>
  const [version, setVersion] = useState(0)

  useEffect(() => {
    const container = containerRef.current!
    const video = videoRef.current!
    if (!container || !video) return

    const onResize = () =>
      setVideoSize((prev) => {
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
  }, [version])

  return {
    videoSize,
    setContainerRef: (container: HTMLDivElement | null) => {
      if (container && containerRef.current !== container) {
        containerRef.current = container
        setVersion((version) => version + 1)
      }
    },
    setVideoRef: (video: HTMLVideoElement | null) => {
      if (video && videoRef.current !== video) {
        videoRef.current = video
        setVersion((version) => version + 1)
      }
    },
  }
}
