import { generatePlanets, Planet } from "./planets"
import { HtmlHelpers } from "../utils"

let animationId: number
let dilation: number

const initSolarSystem2 = () => {
  const { canvas, ctx } = HtmlHelpers.setupCanvas("canvas")
  // const initalTime = NumberHelpers.randomInteger(2000000)
  const initialTime = 0
  setupAnimation(ctx, canvas, initialTime)

  document.getElementById("inputs").addEventListener("change", () => {
    const base = HtmlHelpers.getValue("dilation-input")
    dilation = convertDilation(base)
  })

  document.getElementById("randomize-button").addEventListener("click", () => {
    setupAnimation(ctx, canvas, initialTime)
  })
}

const setupAnimation = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  initalTime: number
) => {
  window.cancelAnimationFrame(animationId)
  const planets = generatePlanets()
  const base = HtmlHelpers.getValue("dilation-input")
  dilation = convertDilation(base)
  startAnimation(ctx, canvas, initalTime, planets)
}

const startAnimation = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number,
  planets: Array<Planet>
) => {
  animationId = window.requestAnimationFrame(
    drawFrame(ctx, canvas, time, planets)
  )
}

const drawFrame = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number,
  planets: Array<Planet>
) => {
  return () => {
    const midX = canvas.width / 2
    const midY = canvas.height / 2

    ctx.globalCompositeOperation = "destination-over"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(midX, midY)

    planets.forEach(planet => {
      drawOrbitingCircle(ctx, time, planet)
      drawOrbit(ctx, time, planet)
    })
    ctx.restore()

    animationId = window.requestAnimationFrame(
      drawFrame(ctx, canvas, tick(time), planets)
    )
  }
}

const drawOrbitingCircle = (
  ctx: CanvasRenderingContext2D,
  time: number,
  planet: Planet
) => {
  const { orbitSpeed, orbitRadius, size, color } = planet
  rotate(ctx, time, orbitSpeed)
  ctx.translate(orbitRadius, 0)
  drawPlanet(ctx, size, color)
  ctx.translate(-orbitRadius, 0)
  anitRotate(ctx, time, orbitSpeed)
}

const drawPlanet = (
  ctx: CanvasRenderingContext2D,
  radius: number,
  color: string
) => {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(0, 0, radius, 0, 2 * Math.PI, true)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.fillStyle = "#ffffff"
  ctx.arc(0, 0, radius + 3, 0, 2 * Math.PI, true)
  ctx.closePath()
  ctx.fill()
}

const drawOrbit = (
  ctx: CanvasRenderingContext2D,
  time: number,
  planet: Planet
) => {
  const { orbitSpeed, orbitRadius } = planet
  rotate(ctx, time, orbitSpeed)
  drawPlanetOrbit(ctx, orbitRadius, "rgb(33,33,33,0.1")
  anitRotate(ctx, time, orbitSpeed)
}

const drawPlanetOrbit = (
  ctx: CanvasRenderingContext2D,
  radius: number,
  color: string
) => {
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.arc(0, 0, radius, 0, 2 * Math.PI, true)
  ctx.stroke()
  ctx.restore()
}

const tick = (time: number) => {
  return time + 1
}

const anitRotate = (
  ctx: CanvasRenderingContext2D,
  time: number,
  orbitSpeed: number
) => {
  rotate(ctx, -1 * time, orbitSpeed)
}

const rotate = (
  ctx: CanvasRenderingContext2D,
  time: number,
  orbitSpeed: number
) => {
  const twoPi = 2 * Math.PI
  const totalRate = orbitSpeed * dilation
  const iteration = time % totalRate
  const rotation = (twoPi / totalRate) * iteration
  ctx.rotate(rotation)
}

const convertDilation = (base: number) => {
  const min = 100000
  const max = 200
  const m = (max - min) / 100
  const b = min
  return m * base + b
}

export default initSolarSystem2
