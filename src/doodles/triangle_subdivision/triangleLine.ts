import { F, A, EQ } from "../../fpts"

import * as TrianglePoint from "./trianglePoint"

export type TriangleLine = [
  TrianglePoint.TrianglePoint,
  TrianglePoint.TrianglePoint
]

const fromPoints =
  (pointA: TrianglePoint.TrianglePoint) =>
  (pointB: TrianglePoint.TrianglePoint): TriangleLine => {
    return [pointA, pointB]
  }

const Eq = EQ.fromEquals<TriangleLine>((a, b) => {
  const [a1, a2] = a.sort()
  const [b1, b2] = b.sort()

  return TrianglePoint.Eq.equals(a1, b1) && TrianglePoint.Eq.equals(a2, b2)
})

export const build = (
  points: TrianglePoint.TrianglePoint[]
): TriangleLine[] => {
  return F.pipe(
    points,
    A.reduce<TrianglePoint.TrianglePoint, TriangleLine[]>([], (acc, pointA) => {
      return F.pipe(
        points,
        A.filter(TrianglePoint.isAdjacent(pointA)),
        A.map(fromPoints(pointA)),
        A.concat(acc),
        A.uniq(Eq)
      )
    })
  )
}
