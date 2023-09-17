import { HtmlHelpers } from "../../utils"

const drawTree = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  len: number,
  angle: number,
  angleRate: number,
  leftRightDiff: number,
  branchWidth: number
) => {
  ctx.save()
  ctx.beginPath()

  ctx.translate(startX, startY)
  ctx.rotate((angle * Math.PI) / 180)
  ctx.moveTo(0, 0)

  ctx.lineTo(0, -len)

  // ctx.lineWidth = branchWidth
  ctx.shadowBlur = 1
  ctx.shadowColor = "rgba(0,0,0,0.75)"
  ctx.stroke()

  if (len < 10) {
    // ctx.beginPath()
    // ctx.arc(0, -len, 10, 0, Math.PI / 2)
    // ctx.fillStyle = "green"
    // ctx.fill()
    ctx.restore()
    return
  }

  // ctx.beginPath()
  // ctx.arc(0, -len, 5, 0, 2 * Math.PI)
  // ctx.fillStyle = "red"
  // ctx.fill()

  drawTree(
    ctx,
    0,
    -len,
    len * 0.8,
    (angle - angleRate) * (1 - leftRightDiff),
    angleRate,
    leftRightDiff,
    branchWidth * 0.8
  )
  drawTree(
    ctx,
    0,
    -len,
    len * 0.8,
    (angle + angleRate) * leftRightDiff,
    angleRate,
    leftRightDiff,
    branchWidth * 0.8
  )

  ctx.restore()
}

const initTree = () => {
  const { canvas, ctx } = HtmlHelpers.setupCanvas("canvas")
  const startX = canvas.width / 2
  const startY = canvas.height / 1.1
  const length = canvas.height / 8

  if (!ctx) {
    return
  }

  drawTree(ctx, startX, startY, length, 0, 20, 0.5, 10)

  document.getElementById("inputs")?.addEventListener("change", () => {
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    const angle = HtmlHelpers.getValue("angle-input")
    const angleRate = HtmlHelpers.getValue("angle-rate-input")
    const leftRightDiff = HtmlHelpers.getValue("left-right-diff-input")

    drawTree(ctx, startX, startY, length, angle, angleRate, leftRightDiff, 10)
  })
}

initTree()
