import { Shape, Asteroid, Circle, Rectangle } from "./shapes"

const runGame = asteroidCount => {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("cnvs")
  )
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")

  const shapes: Array<Shape> = new Array<Shape>()

  for (let i = 0; i < asteroidCount; i++) {
    let asteroid = new Asteroid(ctx)
    shapes.push(asteroid)
  }

  function gameLoop() {
    requestAnimationFrame(gameLoop)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 1280, 720)

    shapes.forEach(shape => {
      shape.draw()
    })
  }

  gameLoop()
}

const initGame = () => {
  const asteroidCountInput = <HTMLInputElement>(
    document.getElementById("asteroid-count-input")
  )
  const asteroidCount = Number(asteroidCountInput.value)

  runGame(asteroidCount)

  document.getElementById("inputs").addEventListener("change", () => {
    const asteroidCountInput = <HTMLInputElement>(
      document.getElementById("asteroid-count-input")
    )
    const asteroidCount = Number(asteroidCountInput.value)

    runGame(asteroidCount)
  })
}
export default initGame
