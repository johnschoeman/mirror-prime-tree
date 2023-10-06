import { F, A, IO } from "../../fpts"
import * as anime from "animejs"
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
  (points: Coord[]) =>
  (isDark: boolean) =>
  (svg: SVG.Svg): IO.IO<SVG.Polygon> => {
    const color: Color = isDark ? colorDark : colorLight
    const className = isDark ? "dark" : "light"
    const [[x1, y1], [x2, y2], [x3, y3]] = points
    const path: SvgPath = `${x1},${y1} ${x2},${y2} ${x3},${y3}`
    const triangleSvg = IO.of(SVG.polygon([path, color, className])(svg))
    return triangleSvg
  }

const drawTriangles = () => {
  const r = HTMLHelpers.getValue("r-input")
  const qPercent = HTMLHelpers.getValue("q-percent-input")
  const q = Math.floor((r * r * qPercent) / 100)

  const rDisplay = <HTMLElement>document.getElementById("r-display")
  const qDisplay = <HTMLElement>document.getElementById("q-display")
  rDisplay.innerText = r.toString()
  qDisplay.innerText = q.toString()

  svg.clear()

  const buildShuffledList =
    (r: number) =>
    (numDark: number): IO.IO<boolean[]> => {
      const arr = new Array(r * r).fill(false)
      return F.pipe(
        arr,
        A.mapWithIndex((idx, _v) => {
          return idx < numDark
        }),
        shuffle
      )
    }

  // const drawSVGs: IO.IO<readonly SVG.Polygon[]> = F.pipe(
  const drawSVGs = F.pipe(
    [r, q],
    ([r, q]) => {
      const tris = IO.of(Triangle.build(r))
      const darkIndicies = buildShuffledList(r)(q)
      const result: IO.IO<[Triangle.Triangle, boolean][]> = F.pipe(
        IO.Do,
        IO.bind("triangles_", () => tris),
        IO.bind("darkIndicies_", () => darkIndicies),
        IO.map(({ triangles_, darkIndicies_ }) => {
          return A.zip(darkIndicies_)(triangles_)
        })
      )
      return result
    },
    IO.map(
      A.map(
        ([triangle, isDark]: [
          TrianglePoint.TrianglePoint[],
          boolean
        ]): IO.IO<SVG.Polygon> => {
          return F.pipe(
            triangle,
            A.map(TrianglePoint.toCartesian),
            A.map(([x, y]) => [x * wPx, y * hPx] as Coord),
            (points) => addTriangleToSVG(points)(isDark)(svg)
          )
        }
      )
    ),
    IO.chain(IO.sequenceArray)
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

anime
  .timeline({
    endDelay: 1000,
    easing: "easeInOutQuad",
    direction: "alternate",
    loop: true,
  })
  .add({ targets: ".light", background: "#FFF" }, 0)
  .add({ targets: ".dark", background: "rgb(255,255,255)" }, 0)
  .add({ targets: ".triangle", translateX: 270 }, 0)
