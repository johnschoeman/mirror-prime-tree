import { ArrayHelpers } from "../utils"
import { Seq } from "./sequence"

type Orienation = true | false

const drawRecaman = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  root: number = 0,
  count: number = 40,
  numberLineSpacing: number = 10
) => {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, startX * 2, startY * 2)

  const recamanSequence: Array<number> = JSON.parse(
    Seq.generateRecaman(0, root, count)
  )
  let orienation = true

  const circlePairs: Array<ArrayHelpers.ArcPair> = ArrayHelpers.makePairs(
    recamanSequence
  )

  circlePairs.forEach(({ lft, rgt }) => {
    drawHalfCirle(
      ctx,
      startY,
      orienation,
      lft * numberLineSpacing,
      rgt * numberLineSpacing
    )
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
  const midpoint: Coordinate = { x: canvasWidth / 2, y: canvasHeight / 2 }
  return { canvas, midpoint }
}

const initRecaman = () => {
  const {
    canvas,
    midpoint: { x: startX, y: startY },
  } = setupCanvas()
  const ctx = canvas.getContext("2d")

  drawRecaman(ctx, 0, startY, 0, 100, 5)

  document.getElementById("inputs").addEventListener("change", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const countInput = <HTMLInputElement>document.getElementById("count-input")
    const rootInput = <HTMLInputElement>document.getElementById("root-input")
    const numberSpaceInput = <HTMLInputElement>(
      document.getElementById("number-space-input")
    )
    const count = Number(countInput.value)
    const root = Number(rootInput.value)
    const numberSpace = Number(numberSpaceInput.value)

    const rootDisplay = <HTMLElement>document.getElementById("root-display")
    rootDisplay.innerText = root.toString()

    drawRecaman(ctx, 0, startY, root, count, numberSpace)
  })
}

export default initRecaman
