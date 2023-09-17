import { Shape, Asteroid } from "./Shapes"
import { HtmlHelpers } from "../../utils"

const runGame = (asteroidCount: number) => {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("cnvs")
  )
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")

  if (!ctx) {
    return
  }

  const shapes: Array<Shape> = new Array<Shape>()

  for (let i = 0; i < asteroidCount; i++) {
    let asteroid = new Asteroid(ctx)
    shapes.push(asteroid)
  }

  function gameLoop() {
    requestAnimationFrame(gameLoop)
    // @ts-ignore
    ctx.fillStyle = "black"
    // @ts-ignore
    ctx.fillRect(0, 0, 1280, 720)

    shapes.forEach(shape => {
      shape.draw()
    })
  }

  gameLoop()
}

const asteroidCount = HtmlHelpers.getValue("asteroid-count-input")

runGame(asteroidCount)

document.getElementById("inputs")?.addEventListener("change", () => {
  const asteroidCount = HtmlHelpers.getValue("asteroid-count-input")
  runGame(asteroidCount)
})
