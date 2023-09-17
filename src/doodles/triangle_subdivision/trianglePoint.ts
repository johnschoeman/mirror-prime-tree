import { F, A, N, O, OR, EQ } from "../../fpts"

// [x, y, z]
export type TrianglePoint = [number, number, number]

export const Eq = EQ.fromEquals<TrianglePoint>((a, b) => {
  const [a1, a2, a3] = a
  const [b1, b2, b3] = b

  return a1 === b1 && a2 === b2 && a3 === b3
})

export const Ord = OR.tuple(N.Ord, N.Ord, N.Ord)

export const pointsInbetween = (
  intCoordA: TrianglePoint,
  intCoordB: TrianglePoint
): TrianglePoint[] => {
  const next = nextInbetweenPoint(intCoordA, intCoordB)
  if (O.isNone(next)) {
    return []
  }

  const rest = pointsInbetween(next.value, intCoordB)

  const results = [next.value, ...rest]

  return F.pipe(results)
}

export const nextInbetweenPoint = (
  intCoordA: TrianglePoint,
  intCoordB: TrianglePoint
): O.Option<TrianglePoint> => {
  const [x1, y1, z1] = intCoordA
  const [x2, y2, z2] = intCoordB

  const x3 = nextCoordValue(x1, x2)
  const y3 = nextCoordValue(y1, y2)
  const z3 = nextCoordValue(z1, z2)

  return F.pipe(
    O.Do,
    O.bind("x3", () => x3),
    O.bind("y3", () => y3),
    O.bind("z3", () => z3),
    O.map(({ x3, y3, z3 }) => [x3, y3, z3])
  )
}

const nextCoordValue = (a: number, b: number): O.Option<number> => {
  if (a === b) {
    return O.some(a)
  }

  if (Math.abs(a - b) === 1) {
    return O.none
  }

  if (a > b) {
    return O.some(a - 1)
  } else {
    return O.some(a + 1)
  }
}

export const build = (r: number): TrianglePoint[] => {
  if (r === 0) {
    return []
  }

  const baseX: TrianglePoint = [1, 0, 0].map((x) => x * r) as TrianglePoint
  const baseY: TrianglePoint = [0, 1, 0].map((x) => x * r) as TrianglePoint
  const baseZ: TrianglePoint = [0, 0, 1].map((x) => x * r) as TrianglePoint

  const baseSet = [baseX, baseY, baseZ]

  const pointsXY = pointsInbetween(baseX, baseY)
  const pointsXZ = pointsInbetween(baseX, baseZ)
  const pointsYZ = pointsInbetween(baseY, baseZ)

  const interiorPoints = F.pipe(
    pointsXZ,
    A.zip(pointsYZ),
    A.chain(([start, end]) => pointsInbetween(start, end))
  )

  return F.pipe(
    baseSet,
    A.concat(pointsXY),
    A.concat(pointsXZ),
    A.concat(pointsYZ),
    A.concat(interiorPoints)
  )
}

// Are points adjacent in subdivison?
// [3, 0, 0] -> [3, 3, 3]
// [1, 1, 1] -> [1, 2, 3]
// [0, 2, 1] -> [0, 2, 3]

type AdjacentcyMetric = [number, number, number]
const toAdjacentcyMetric = (point: TrianglePoint): AdjacentcyMetric => {
  return F.pipe(
    point,
    A.mapWithIndex((i, coord) => {
      return F.pipe(
        point,
        A.reduceWithIndex(0, (j, acc, x) => {
          if (j <= i) {
            return acc + x
          } else {
            return acc
          }
        })
      )
    })
  ) as TrianglePoint
}

export const isAdjacent =
  (pointA: TrianglePoint) =>
  (pointB: TrianglePoint): boolean => {
    const compA = toAdjacentcyMetric(pointA)
    const compB = toAdjacentcyMetric(pointB)

    const comparison = F.pipe(
      compA,
      A.zip(compB),
      A.map(([a, b]) => {
        return a - b
      })
    )

    const allOneOrZero = F.pipe(
      comparison,
      A.every((x) => x === 0 || x === 1)
    )
    const allMinusOneOrZero = F.pipe(
      comparison,
      A.every((x) => x === 0 || x === -1)
    )
    const allZero = F.pipe(
      comparison,
      A.every((x) => x === 0)
    )

    return !allZero && (allOneOrZero || allMinusOneOrZero)
  }

// Cartesian Coordinates
//    0     x
//    ------>
// 0 |
//   |
//   |
// y v

// [x, y, z] -> [x, y]
export const toCartesian = (point: TrianglePoint): [number, number] => {
  const [x, y, z] = point

  const scale = F.pipe(
    point,
    A.reduce(0, (acc, x) => acc + x)
  )

  const yCart = 1 - z / scale
  const xCartFromY = 0.5 * (y / scale)
  const xCartFromX = 0.5 * (1 - x / scale)

  const xCart = xCartFromX + xCartFromY

  return [xCart, yCart]
}
