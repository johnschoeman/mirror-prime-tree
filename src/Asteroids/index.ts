import { Shape, Asteroid } from "./Shapes"
import { HtmlHelpers } from "../utils"

const runGame = (asteroidCount: number) => {
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
  const asteroidCount = HtmlHelpers.getValue("asteroid-count-input")
  runGame(asteroidCount)
  document.getElementById("inputs").addEventListener("change", () => {
    const asteroidCount = HtmlHelpers.getValue("asteroid-count-input")
    runGame(asteroidCount)
  })
}

export default initGame
