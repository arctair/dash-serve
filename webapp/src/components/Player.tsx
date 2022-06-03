import useDashPlayback from './useDashPlayback'
import useFitToScreen from './useFitToScreen'

export default function Player() {
  const dashPlayback = useDashPlayback(
    'https://dash.snare.cc/live.brunchyroll.mpd',
  )
  const fitToScreen = useFitToScreen()

  return (
    <div
      ref={(container) => {
        fitToScreen.setContainerRef(container)
      }}
      style={{ height: '100%', display: 'grid' }}
    >
      <video
        ref={(video) => {
          fitToScreen.setVideoRef(video)
          dashPlayback.setVideoRef(video)
        }}
        controls
        style={{ ...fitToScreen.videoSize, margin: 'auto' }}
      />
    </div>
  )
}
