import { HtmlHelpers } from "../../utils"

const kochSequence = (iteration: number) => {
  if (iteration <= 1) {
    return "1101"
  }
  const prevSeq = kochSequence(iteration - 1)
  const tail = prevSeq.slice(1)
  return "1" + tail + "1" + tail + "0" + tail + "1" + tail
}

const drawKochCurve = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  iteration: number
) => {
  const segmentLength = canvas.width / Math.pow(3, iteration)
  const sequence = kochSequence(iteration)
  const parts = sequence.split("")

  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.lineWidth = 1
  ctx.translate(0, canvas.height / 2)

  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.rotate(Math.PI / 3)

  parts.forEach((part: string) => {
    if (part === "1") {
      ctx.rotate((5 * Math.PI) / 3)
      ctx.translate(segmentLength, 0)
      ctx.lineTo(0, 0)
    } else {
      ctx.rotate((2 * Math.PI) / 3)
      ctx.translate(segmentLength, 0)
      ctx.lineTo(0, 0)
    }
  })

  ctx.stroke()
  ctx.restore()
}

const initKochCurve = () => {
  const { canvas, ctx } = HtmlHelpers.setupCanvas("canvas")

  drawKochCurve(canvas, ctx, 1)
  document.getElementById("inputs").addEventListener("change", () => {
    const iteration = HtmlHelpers.getValue("iteration-input")
    drawKochCurve(canvas, ctx, iteration)
  })
}

initKochCurve()
