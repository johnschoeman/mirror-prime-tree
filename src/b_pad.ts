import { HtmlHelpers } from "./utils"

let animationId: number
let colorCount: number = 3
let colors: string[] = generateColors(3)
let dilationCRatio: number = 1
let circleSize: number = 10
let comressorRatio: number = 1

const initBPad = () => {
  const { canvas, ctx } = HtmlHelpers.setupCanvas("canvas")

  const { audioCtx, audioElement } = setupAudio()

  const playButton = document.getElementById("play-button")
  const stopButton = document.getElementById("stop-button")

  document.getElementById("color-count").addEventListener("change", () => {
    colorCount = HtmlHelpers.getValue("color-count")
    colors = generateColors(colorCount)
  })

  document.getElementById("dilation").addEventListener("change", () => {
    dilationCRatio = HtmlHelpers.getValue("dilation")
  })

  document.getElementById("circle-size").addEventListener("change", () => {
    circleSize = HtmlHelpers.getValue("circle-size")
  })

  playButton.addEventListener("click", () => {
    startAudio(audioCtx, audioElement)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    animationId = window.requestAnimationFrame(animateCircles(ctx))
  })

  stopButton.addEventListener("click", () => {
    stopAudio(audioElement)
    window.cancelAnimationFrame(animationId)
  })
}

const resetCompressor = () => {}

function generateColors(colorCount: number = 3) {
  const colors = []
  for (let i = 0; i < colorCount; i++) {
    colors.push(randomColor())
  }
  return colors
}

const setupAudio = () => {
  const AudioContext = window.AudioContext
  const audioCtx = new AudioContext()

  const audioElement = document.querySelector("audio")
  const track = audioCtx.createMediaElementSource(audioElement)
  const compressor = audioCtx.createDynamicsCompressor()
  compressor.threshold.value = -50
  compressor.knee.value = 40
  compressor.ratio.value = 1
  compressor.attack.value = 0
  compressor.release.value = 0.25

  audioElement.addEventListener("ended", () => {
    audioElement.play()
  })

  track.connect(compressor).connect(audioCtx.destination)
  return { audioCtx, audioElement }
}

const startAudio = (audioCtx, audioElement: HTMLAudioElement) => {
  // check if context is in suspended state (autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume()
  }
  audioElement.play()
}

const stopAudio = (audioElement: HTMLAudioElement) => {
  audioElement.pause()
}

const animateCircles = (ctx: CanvasRenderingContext2D) => {
  return () => {
    animationId = window.requestAnimationFrame(animateCircles(ctx))
    draw(ctx)
  }
}

function draw(ctx: CanvasRenderingContext2D) {
  let time = new Date().getTime() * 0.002
  let x = Math.sin(time) * 192 + 256
  let y = Math.cos(time * 0.9) * 192 + 256

  const index = Math.floor(time * dilationCRatio) % colors.length

  ctx.fillStyle = colors[index]

  ctx.beginPath()
  ctx.arc(x, y, circleSize, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
}

function randomColor() {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)

  return `rgb(${red},${green},${blue},1.0)`
}

export default initBPad
