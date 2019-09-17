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
  const canvasEl = <HTMLCanvasElement>document.getElementById("canvas")
  const canvasContainer = <HTMLElement>document.getElementById("canvas-div")
  let ctx = canvasEl.getContext("2d")

  const canvasWidth = canvasContainer.offsetWidth
  const canvasHeight = canvasContainer.offsetHeight
  canvasEl.width = canvasWidth
  canvasEl.height = canvasHeight
  const startX = canvasWidth / 2
  const startY = canvasHeight / 1.1
  const length = canvasHeight / 8

  drawTree(ctx, startX, startY, length, 0, 20, 0.5, 10)

  document.getElementById("inputs").addEventListener("change", () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    const angleInput = <HTMLInputElement>document.getElementById("angle-input")
    const angleRateInput = <HTMLInputElement>(
      document.getElementById("angle-rate-input")
    )
    const leftRightDiffInput = <HTMLInputElement>(
      document.getElementById("left-right-diff-input")
    )
    const angle = Number(angleInput.value)
    const angleRate = Number(angleRateInput.value)
    const leftRightDiff = Number(leftRightDiffInput.value)

    drawTree(ctx, startX, startY, length, angle, angleRate, leftRightDiff, 10)
  })
}

export default initTree
