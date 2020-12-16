import React, { useEffect } from "react"
import "./App.css"
import useSound from "use-sound"
import Peaks, { PeaksInstance, PeaksOptions } from "peaks.js"

function App() {
  const coolMusic =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

  const [play, { pause, stop }] = useSound(coolMusic)
  let audioPlay = new Audio(coolMusic)
  const AudioContext = window.AudioContext
  const audioContext = new AudioContext()
  let peaksInstance: PeaksInstance | undefined
  useEffect(() => {
    var req = new XMLHttpRequest()
    req.open("GET", coolMusic, true)
    req.responseType = "arraybuffer"
    req.onload = (e) => {
      audioContext
        .decodeAudioData(req.response)
        .then((audioBuffer) => {
          const options: PeaksOptions = {
            containers: {
              overview: document.getElementById("overview-waveform"),
              zoomview: document.getElementById("zoomview-waveform"),
            },
            mediaElement: document.querySelector("audio") || new Element(),
            webAudio: {
              audioContext: audioContext,
              audioBuffer: audioBuffer,
            },
          }
          Peaks.init(options, (err, peaks) => {
            peaksInstance = peaks
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
    req.send()
  }, [])

  return (
    <div style={{ height: "100hv", width: "100wv" }}>
      <div id="peaks-container">
        <div id="zoomview-container"></div>
        <div id="overview-container"></div>
      </div>
      <button
        onClick={(e) => {
          console.log("Play Clicked")
          peaksInstance?.player.play()
        }}
      >
        Start
      </button>
      <button
        onClick={(e) => {
          console.log("Pause Clicked")
          peaksInstance?.player.pause()
        }}
      >
        Pause
      </button>
      <button
        onClick={(e) => {
          console.log("Stop Clicked")
          peaksInstance?.player.pause()
        }}
      >
        Stop
      </button>
    </div>
  )
}

export default App
