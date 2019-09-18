import { HtmlHelpers } from "./utils"

let sun = new Image()
let moon = new Image()
let earth = new Image()

const init = function init(ctx) {
  sun.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png"
  moon.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png"
  earth.src = "https://mdn.mozillademos.org/files/1429/Canvas_earth.png"
  window.requestAnimationFrame(draw(ctx))
}

function draw(ctx) {
  return () => {
    ctx.globalCompositeOperation = "destination-over"
    ctx.clearRect(0, 0, 300, 300)

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
    ctx.strokeStyle = "rgba(0,153,255,0.4)"
    ctx.save()
    ctx.translate(150, 150)

    let time = new Date()
    ctx.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()
    )
    ctx.translate(105, 0)
    ctx.fillRect(0, -12, 50, 24) //Shadow
    ctx.drawImage(earth, -12, -12)

    //Moon
    ctx.save()
    ctx.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()
    )
    ctx.translate(0, 28.5)
    ctx.drawImage(moon, -3.5, -3.5)
    ctx.restore()

    ctx.restore()

    ctx.beginPath()
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false) //Earth Orbit

    ctx.drawImage(sun, 0, 0, 300, 300)

    window.requestAnimationFrame(draw(ctx))
  }
}

const initSolarSystem = () => {
  const { ctx } = HtmlHelpers.setupCanvas("canvas")
  init(ctx)
}

export default initSolarSystem
