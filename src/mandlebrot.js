import { HtmlHelpers } from "./utils"

const createMandlebrot = function createMandlebrot() {
  let myCanvas = document.createElement("canvas")
  myCanvas.width = 600
  myCanvas.height = 600
  document.body.appendChild(myCanvas)
  let ctx = myCanvas.getContext("2d")

  drawMandlebrot(myCanvas, ctx)
}

const checkIfBelongsToMandlebrotSet = function checkIfBelongsToMandlebrotSet(
  x,
  y
) {
  let realComponentOfResult = x
  let imaginaryComponentOfResult = y
  let maxIterations = 300
  for (let i = 0; i < maxIterations; i++) {
    var tempRealComponent =
      realComponentOfResult * realComponentOfResult -
      imaginaryComponentOfResult * imaginaryComponentOfResult +
      x

    var tempImaginaryComponent =
      2 * realComponentOfResult * imaginaryComponentOfResult + y

    realComponentOfResult = tempRealComponent
    imaginaryComponentOfResult = tempImaginaryComponent
    if (realComponentOfResult * imaginaryComponentOfResult > 5) {
      return (i / maxIterations) * 100
    }
  }

  return 0
}

const drawMandlebrot = function drawMandlebrot(myCanvas, ctx) {
  let magnificationFactor = 200
  let panX = 2
  let panY = 1

  for (let x = 0; x < myCanvas.width; x++) {
    for (let y = 0; y < myCanvas.height; y++) {
      let belongsToSet = checkIfBelongsToMandlebrotSet(
        x / magnificationFactor - panX,
        y / magnificationFactor - panY
      )
      if (belongsToSet == 0) {
        ctx.fillStyle = "#000"
        ctx.fillRect(x, y, 1, 1)
      } else {
        ctx.fillStyle = "hsl(0, 100%, " + belongsToSet + "%)"
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }
}

export const run = () => {
  const { canvas, ctx } = HtmlHelpers.setupCanvas("canvas")
  drawMandlebrot(canvas, ctx)
}

export default run
