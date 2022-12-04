import { generateTree } from "./mirror_prime_generator"
import { drawMirrorTree } from "./mirror_tree"
import { initTreeAnimation } from "./animate_tree"
import { HtmlHelpers } from "../../utils"

interface TreeOptions {
  seed: number
  iterations: number
  maxChildNodes: number
  showPrimes: boolean
  showComposites: boolean
}

interface DrawOptions {
  startX: number | null
  startY: number | null
  length: number
  startAngle: number
  angleRange: number
  angle: number
  angleSpread: number
  dotSize: number
  lengthMultiple: number
  terminalLengthMultiplier: number
  terminalAngleRange: number
  currentNode: number
}

interface AnimateOptions {
  currentIteration: number
  maxIteration: number
}

const initMirrorTree = () => {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas")
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  let ctx = canvas.getContext("2d")

  createTree(ctx, canvas)

  document.getElementById("inputs").addEventListener("change", () => {
    createTree(ctx, canvas)
  })

  initAnimationNav(ctx, canvas)
}

function initAnimationNav(ctx, canvasEl) {
  let startButton = document.getElementById("start-animation")
  startButton.addEventListener("click", () => {
    let { drawOptions, treeOptions, animateOptions } = getUserInput()
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    drawOptions.startX = canvasEl.width / 2
    drawOptions.startY = canvasEl.height / 2
    initTreeAnimation(ctx, drawOptions, treeOptions, animateOptions, canvasEl)
  })
}

function createTree(ctx, canvasEl) {
  let { drawOptions } = getUserInput()
  drawOptions.startX = canvasEl.width / 2
  drawOptions.startY = canvasEl.height / 2
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
  drawMirrorTree(ctx, drawOptions)
}

function getUserInput() {
  let seed = HtmlHelpers.getValue("seed-input")
  let iterations = HtmlHelpers.getValue("iterations-input")
  let maxChildNodes = HtmlHelpers.getValue("max-child-nodes-input")

  let showPrimes = HtmlHelpers.getChecked("show-primes-input")
  let showComposites = HtmlHelpers.getChecked("show-composites-input")

  let treeOptions: TreeOptions = {
    seed,
    iterations,
    maxChildNodes,
    showPrimes,
    showComposites,
  }

  let t = generateTree(treeOptions)

  let length = HtmlHelpers.getValue("length-input")
  let angleSpread = HtmlHelpers.getValue("spread-input")
  let lengthMultiple = HtmlHelpers.getValue("length-multiple-input")
  let dotSize = HtmlHelpers.getValue("dot-size-input")
  let terminalLengthMultiplier = HtmlHelpers.getValue(
    "terminal-length-multiple-input"
  )
  let terminalAngleRange = HtmlHelpers.getValue("terminal-angle-range-input")

  let drawOptions: DrawOptions = {
    startX: null,
    startY: null,
    length,
    startAngle: 0,
    angleRange: 2 * Math.PI,
    angle: 0,
    angleSpread,
    dotSize,
    lengthMultiple,
    terminalLengthMultiplier,
    terminalAngleRange,
    currentNode: t.nodeHash[treeOptions.seed],
  }

  let animateOptions: AnimateOptions = {
    currentIteration: 0,
    maxIteration: iterations,
  }

  return { drawOptions, treeOptions, animateOptions }
}

initMirrorTree()
