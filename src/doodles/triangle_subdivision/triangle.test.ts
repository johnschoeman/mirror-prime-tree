import * as TrianglePoint from "./trianglePoint"
import * as TriangleLine from "./triangleLine"
import * as Triangle from "./triangle"

describe("Triangle", () => {
  describe("build", () => {
    describe("when given an empty array", () => {
      it("returns an empty array", () => {
        const points: TrianglePoint.TrianglePoint[] = []

        const result = TriangleLine.build(points)

        const expected: TriangleLine.TriangleLine[] = []

        expect(result).toEqual(expected)
      })
    })

    describe("when given the r=2 triangle points", () => {
      it("connects the correct points edgewise", () => {
        const points = TrianglePoint.build(2)

        const result = Triangle.build(points)

        const expected = [
          [
            [0, 0, 2],
            [0, 1, 1],
            [1, 0, 1],
          ],
          [
            [0, 1, 1],
            [0, 2, 0],
            [1, 1, 0],
          ],
          [
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0],
          ],
          [
            [1, 0, 1],
            [1, 1, 0],
            [2, 0, 0],
          ],
        ]

        expect(result.sort()).toEqual(expected.sort())
      })
    })
  })
})
