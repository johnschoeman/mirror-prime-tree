import { F, A, IO } from "../../fpts"
import { shuffle } from "../../utils/array_helpers"
import * as HTMLHelpers from "../../utils/html_helpers"

import { SVG } from "@svgdotjs/svg.js"

import * as TrianglePoint from "./trianglePoint"
import * as Triangle from "./triangle"

const target = document.querySelector("#container") as HTMLElement

const colorDark = "#212121"
const colorLight = "#fafafa"
const clientWidth = target.clientWidth
const clientHeight = target.clientHeight

const wPx = Math.min(clientWidth, clientHeight)
const hPx = wPx

const draw = SVG().addTo(target).size(wPx, hPx)

const drawTriangle = () => {
  const r = HTMLHelpers.getValue("r-input")
  const qPercent = HTMLHelpers.getValue("q-percent-input")
  const q = Math.floor((r * r * qPercent) / 100)

  const rDisplay = <HTMLElement>document.getElementById("r-display")
  const qDisplay = <HTMLElement>document.getElementById("q-display")
  rDisplay.innerText = r.toString()
  qDisplay.innerText = q.toString()

  draw.clear()

  F.pipe(
    r,
    TrianglePoint.build,
    Triangle.build,
    A.map((triangle) => {
      return F.pipe(
        triangle,
        A.map(TrianglePoint.toCartesian),
        A.map(([x, y]) => [x * wPx, y * hPx])
      )
    }),
    shuffle,
    IO.map(
      A.mapWithIndex((idx, [[x1, y1], [x2, y2], [x3, y3]]) => {
        const color = idx < q ? colorDark : colorLight
        const lineStyle = {
          width: 1,
          color,
        }
        draw
          .polygon(`${x1},${y1} ${x2},${y2} ${x3},${y3}`)
          .stroke(lineStyle)
          .fill(color)
      })
    )
  )()
}

const initTriangleSubdivision = () => {
  document.getElementById("inputs")?.addEventListener("change", drawTriangle)
  document.getElementById("reset-btn")?.addEventListener("click", drawTriangle)
  document.getElementById("container")?.addEventListener("click", drawTriangle)
  drawTriangle()
}

initTriangleSubdivision()
