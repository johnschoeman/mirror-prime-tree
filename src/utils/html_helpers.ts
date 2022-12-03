export const getValue = (id: string) => {
  const input = <HTMLInputElement>document.getElementById(id)
  return Number(input.value)
}

export const getChecked = (id: string) => {
  const input = <HTMLInputElement>document.getElementById(id)
  return input.checked
}

export const setupCanvas = (id: string) => {
  const canvas = <HTMLCanvasElement>document.getElementById(id)
  const canvasWidth = canvas.offsetWidth
  const canvasHeight = canvas.offsetHeight
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  const ctx = canvas.getContext("2d")
  return { canvas, ctx }
}

export const setupDoodle = () => {
  document.getElementById("back-button").addEventListener("click", () => {
    history.back()
  })
}
