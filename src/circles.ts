import { HtmlHelpers } from "./utils"

let toggle: boolean
let animationId: number

const initCircles = function initCircles() {
  const { canvas, ctx } = HtmlHelpers.setupCanvas("canvas")

  const startButton = document.getElementById("start-animation-button")
  const stopButton = document.getElementById("stop-animation-button")

  animationId = window.requestAnimationFrame(animateCircles(ctx))

  stopButton.addEventListener("click", () => {
    window.cancelAnimationFrame(animationId)
  })
  startButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    animationId = window.requestAnimationFrame(animateCircles(ctx))
  })
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
  toggle = !toggle

  ctx.fillStyle = toggle ? "rgb(200,200,20)" : "rgb(20,20,200)"
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
}

export default initCircles
