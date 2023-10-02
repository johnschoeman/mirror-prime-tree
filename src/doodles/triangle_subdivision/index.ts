import { F, A, T, IO } from "../../fpts"
import { shuffle } from "../../utils/array_helpers"
import * as HTMLHelpers from "../../utils/html_helpers"

import * as SVG from "../fp-svg"

import * as TrianglePoint from "./trianglePoint"
import * as Triangle from "./triangle"

const target = document.querySelector("#container") as HTMLElement

const colorDark = "#212121"
const colorLight = "#fafafa"
const clientWidth = target.clientWidth
const clientHeight = target.clientHeight

const wPx = Math.min(clientWidth, clientHeight)
const hPx = wPx

const svg = SVG.svg(wPx, hPx)(target)

type Coord = [number, number]
type Color = string
type SvgPath = string

const addTriangleToSVG =
  (isDark: boolean) =>
  (points: Coord[]) =>
  (svg: SVG.Svg): IO.IO<SVG.Polygon> => {
    const color: Color = isDark ? colorDark : colorLight
    const [[x1, y1], [x2, y2], [x3, y3]] = points
    const path: SvgPath = `${x1},${y1} ${x2},${y2} ${x3},${y3}`
    const triangleSvg = IO.of(
      svg
        .polygon(path)
        .stroke({ width: 1, color })
        .fill(color)
        // .click(function () {
        //   const el: SVG.Polygon = this as unknown as SVG.Polygon
        //   const currentColor = el.attr("fill")
        //   const nextColor = currentColor === colorDark ? colorLight : colorDark
        //   el.fill({ color: nextColor })
        //   el.stroke({ width: 1, color: nextColor })
        // })
    )
    return triangleSvg
  }

const addTriangleToSVGFoo =
  (isDark: boolean) =>
  (points: Coord[]) =>
  (svg: SVG.Svg): IO.IO<SVG.Polygon> => {
    const color: Color = isDark ? colorDark : colorLight
    const [[x1, y1], [x2, y2], [x3, y3]] = points
    const path: SvgPath = `${x1},${y1} ${x2},${y2} ${x3},${y3}`
    const triangleSvg = IO.of(
      svg
        .polygon(path)
        .stroke({ width: 1, color })
        .fill(color)
        // .click(function () {
        //   const el: SVG.Polygon = this as unknown as SVG.Polygon
        //   const currentColor = el.attr("fill")
        //   const nextColor = currentColor === colorDark ? colorLight : colorDark
        //   el.fill({ color: nextColor })
        //   el.stroke({ width: 1, color: nextColor })
        // })
    )
    return triangleSvg
  }

// const triangle =
//   (isDark: boolean) =>
//   (points: Coord[]): SVG.Polygon => {
//     const color: Color = isDark ? colorDark : colorLight
//     const [[x1, y1], [x2, y2], [x3, y3]] = points
//     const path: SvgPath = `${x1},${y1} ${x2},${y2} ${x3},${y3}`
//     const triangleSvg = SVG.svg([
//         path(path),
//         width("1"),
//         color(color),
//         fill(color)
//     ])([])
//     return triangleSvg
//   }

const drawTriangles = () => {
  const r = HTMLHelpers.getValue("r-input")
  const qPercent = HTMLHelpers.getValue("q-percent-input")
  const q = Math.floor((r * r * qPercent) / 100)

  const rDisplay = <HTMLElement>document.getElementById("r-display")
  const qDisplay = <HTMLElement>document.getElementById("q-display")
  rDisplay.innerText = r.toString()
  qDisplay.innerText = q.toString()

  svg.clear()

  // const drawSVGs: IO.IO<readonly SVG.Polygon[]> = F.pipe(
  const drawSVGs = F.pipe(
    r,
    Triangle.build,
    A.map((triangle) => {
      return F.pipe(
        triangle,
        A.map(TrianglePoint.toCartesian),
        A.map(([x, y]) => [x * wPx, y * hPx] as Coord)
      )
    }),
    shuffle,
    IO.map(
      A.mapWithIndex((idx, points: Coord[]) => {
        const isDark = idx < q
        // return addTriangleToSVG(isDark)(points)(svg)
        return addTriangleToSVG(isDark)(points)
      })
    ),
    // IO.chain(IO.sequenceArray),
    // IO.map((foo) => foo(svg))
  )

  drawSVGs()
}

const initTriangleSubdivision = () => {
  document.getElementById("inputs")?.addEventListener("change", drawTriangles)
  document.getElementById("reset-btn")?.addEventListener("click", drawTriangles)
  document.getElementById("container")?.addEventListener("click", drawTriangles)
  drawTriangles()
}

initTriangleSubdivision()
