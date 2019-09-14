export const generateSequence = function generateSequence() {
  let sequence = "0"
  for (let i = 0; i < 17; i++) {
    let parts = sequence.split("")
    let complement = ""
    for (let j = 0; j < parts.length; j++) {
      complement = complement + (parts[j] === "0" ? "1" : "0")
    }
    sequence += complement
  }
  return sequence
}

export const drawKochCurve = function drawKochCurve(myCanvas, ctx) {
  var sequence = generateSequence()
  var parts = sequence.split("")
  ctx.translate(0, myCanvas.height)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] === "0") {
      ctx.translate(0, 10)
      ctx.lineTo(0, 10)
    } else {
      ctx.rotate(Math.PI / 3)
    }
  }
  ctx.stroke()
}
