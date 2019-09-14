export function sizeCanvas(canvas) {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  let canvasHeight, canvasWidth
  if (vw > 1100) {
    canvasWidth = "1100px"
  } else if (vw > 800) {
    canvasWidth = "800px"
  } else if (vw > 600) {
    canvasWidth = "600px"
  } else if (vw > 500) {
    canvasWidth = "500px"
  } else {
    canvasWidth = "400px"
  }

  if (vh > 1100) {
    canvasHeight = "900px"
  } else if (vh > 800) {
    canvasHeight = "900px"
  } else {
    canvasHeight = "400px"
  }

  canvas.style.width = canvasWidth
  canvas.style.height = canvasHeight

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}

export const sizeCanvasMax = canvas => {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  canvas.style.width = 0.8 * vw
  canvas.style.height = 0.8 * vh

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}
