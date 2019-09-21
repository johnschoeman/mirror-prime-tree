import { ArrayHelpers, HtmlHelpers } from "../utils"
import { Seq } from "./sequence"

let animationId: number

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

const animateRecaman = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  startX: number,
  startY: number,
  root: number,
  count: number,
  numberLineSpacing: number
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawRecaman(ctx, startX, startY, root, count, numberLineSpacing)

  animationId = window.requestAnimationFrame(() => {
    animateRecaman(
      ctx,
      canvas,
      startX,
      startY,
      root,
      count + 1,
      numberLineSpacing
    )
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

const initRecaman = () => {
  const { canvas, ctx } = HtmlHelpers.setupCanvas("canvas")

  const startY = canvas.height / 2

  drawRecaman(ctx, 0, startY, 17, 100, 5)
  // initRecamanAnimation(ctx, canvas, startY, 17, 5)

  document.getElementById("inputs").addEventListener("change", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const count = HtmlHelpers.getValue("count-input")
    const root = HtmlHelpers.getValue("root-input")
    const scale = HtmlHelpers.getValue("scale-input")

    const rootDisplay = <HTMLElement>document.getElementById("root-display")
    rootDisplay.innerText = root.toString()

    drawRecaman(ctx, 0, startY, root, count, scale)
    // initRecamanAnimation(ctx, canvas, startY, root, scale)
  })
}

// const initRecamanAnimation = (
//   ctx: CanvasRenderingContext2D,
//   canvas: HTMLCanvasElement,
//   startY: number,
//   root: number,
//   scale: number
// ) => {
//   document
//     .getElementById("start-animation-button")
//     .addEventListener("click", () => {
//       console.log("start")
//       animationId = window.requestAnimationFrame(() => {
//         animateRecaman(ctx, canvas, 0, startY, root, 0, scale)
//       })
//     })

//   document
//     .getElementById("stop-animation-button")
//     .addEventListener("click", () => {
//       console.log("stop")
//       console.log(animationId)
//       window.cancelAnimationFrame(animationId)
//     })
// }

export default initRecaman
