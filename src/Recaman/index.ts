import { ArrayHelpers } from "../utils"

type Orienation = true | false

const drawRecaman = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number
) => {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, startX * 2, startY * 2)

  const recamanSequence: Array<number> = [0, 1, 3, 6, 2, 7, 13, 20, 12]
  let orienation = true

  const circlePairs = ArrayHelpers.makePairs(recamanSequence)

  circlePairs.forEach(({ lft, rgt }) => {
    drawHalfCirle(ctx, startY, orienation, lft * 10, rgt * 10)
    orienation = !orienation
  })
}

const drawHalfCirle = (
  ctx: CanvasRenderingContext2D,
  y: number,
  orientaiton: Orienation,
  xLeft: number,
  xRight: number
) => {
  const xMid = (xLeft + xRight) / 2
  const radius = (xRight - xLeft) / 2

  ctx.beginPath()
  ctx.save()
  ctx.strokeStyle = "red"
  ctx.lineWidth = 1

  if (orientaiton) {
    ctx.arc(xMid, y, radius, -Math.PI, 0)
  } else {
    ctx.arc(xMid, y, radius, 0, Math.PI)
  }

  ctx.stroke()
  ctx.restore()
}

const runRecaman = () => {
  const {
    canvas,
    midpoint: { x: startX, y: startY },
  } = setupCanvas()
  const ctx = canvas.getContext("2d")

  drawRecaman(ctx, 0, startY)
}

interface Coordinate {
  x: number
  y: number
}

const setupCanvas = () => {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas")
  const canvasWidth = canvas.offsetWidth
  const canvasHeight = canvas.offsetHeight
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  console.log("canvas dimensions: ", canvasWidth, canvasHeight)
  const midpoint: Coordinate = { x: canvasWidth / 2, y: canvasHeight / 2 }
  return { canvas, midpoint }
}

const initRecaman = () => {
  runRecaman()
}

export default initRecaman
