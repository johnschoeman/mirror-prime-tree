import { F, A, EQ } from "../../fpts"

import * as TrianglePoint from "./trianglePoint"

export type Triangle = [
  TrianglePoint.TrianglePoint,
  TrianglePoint.TrianglePoint,
  TrianglePoint.TrianglePoint
]

const fromPoints =
  (pointA: TrianglePoint.TrianglePoint) =>
  (pointB: TrianglePoint.TrianglePoint) =>
  (pointC: TrianglePoint.TrianglePoint): Triangle => {
    return [pointA, pointB, pointC]
  }

const Eq = EQ.fromEquals<Triangle>((a, b) => {
  const [a1, a2, a3] = a.sort()
  const [b1, b2, b3] = b.sort()

  return (
    TrianglePoint.Eq.equals(a1, b1) &&
    TrianglePoint.Eq.equals(a2, b2) &&
    TrianglePoint.Eq.equals(a3, b3)
  )
})

export const build = (points: TrianglePoint.TrianglePoint[]): Triangle[] => {
  return F.pipe(
    points,
    A.reduce<TrianglePoint.TrianglePoint, Triangle[]>([], (acc, pointA) => {
      return F.pipe(
        points,
        A.filter(TrianglePoint.isAdjacent(pointA)),
        A.reduce<TrianglePoint.TrianglePoint, Triangle[]>(
          [],
          (accB, pointB) => {
            return F.pipe(
              points,
              A.filter(TrianglePoint.isAdjacent(pointB)),
              A.filter(TrianglePoint.isAdjacent(pointA)),
              A.map(fromPoints(pointA)(pointB)),
              A.concat(accB),
              A.uniq(Eq)
            )
          }
        ),
        A.concat(acc),
        A.uniq(Eq)
      )
    })
  )
}
