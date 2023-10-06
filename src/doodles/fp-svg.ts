import * as SvgDot from "@svgdotjs/svg.js"
import { F, A, T, IO } from "../fpts"

type Attribute = { kind: "width"; value: string }

export type Svg = SvgDot.Svg
export type Polygon = SvgDot.Polygon

type SvgMsg = IO.IO<Svg>
type HtmlMsg = IO.IO<string>

// export const svg = (attributes: Attribute[]) => (children: SvgMsg[]): HtmlMsg => {
// }

export const svg =
  (width: number, height: number) =>
  (target: HTMLElement): Svg => {
    return SvgDot.SVG().addTo(target).size(width, height)
  }

type Path = string
type Color = string
type Class = string
type Attributes = [Path, Color, Class]

export const polygon =
  (attributes: Attributes) =>
  (svg: Svg): Polygon => {
    const [path, color, className] = attributes
    return svg
      .polygon(path)
      .stroke({ width: 1, color })
      .fill(color)
      .addClass("triangle")
      .addClass(className)
  }
