import * as TrianglePoint from './trianglePoint';

describe("TrianglePoint", () => {
  describe("build", () => {
    it("should return empty array when r is 0", () => {
      const r = 0

      const result = TrianglePoint.build(r)

      const expected: TrianglePoint.TrianglePoint[] = []

      expect(result).toEqual(expected)
    })

    it("should return the base points when r is 1", () => {
      const r = 1

      const result = TrianglePoint.build(r)

      const expected = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]

      expect(result).toEqual(expected)
    })

    it("should return the correct points when r is 2", () => {
      const r = 2

      const result = TrianglePoint.build(r).sort()

      const expected = [
        [2, 0, 0],
        [0, 2, 0],
        [0, 0, 2],
        [1, 1, 0],
        [0, 1, 1],
        [1, 0, 1],
      ].sort()

      expect(result).toEqual(expected)
    })

    it("should return the correct points when r is 3", () => {
      const r = 3

      const result = TrianglePoint.build(r)

      const expected = [
        [0, 0, 3],
        [0, 1, 2],
        [0, 2, 1],
        [0, 3, 0],
        [1, 0, 2],
        [1, 1, 1],
        [1, 2, 0],
        [2, 0, 1],
        [2, 1, 0],
        [3, 0, 0],
      ]

      expect(result.sort()).toEqual(expected)
    })
  })

  describe("isAdjacent", () => {
    describe("when given the same point", () => {
      it("should return false", () => {
        const point: TrianglePoint.TrianglePoint = [0, 0, 2]

        const result = TrianglePoint.isAdjacent(point)(point)

        const expected = false

        expect(result).toEqual(expected)
      })
    })

    describe("when given the different points within the metric rule", () => {
      it("should return true", () => {
        const pointA: TrianglePoint.TrianglePoint = [1, 0, 1]
        const pointB: TrianglePoint.TrianglePoint = [1, 1, 0]

        const result = TrianglePoint.isAdjacent(pointA)(pointB)

        const expected = true

        expect(result).toEqual(expected)
      })
    })

    describe("when given the different points outside the metric rule", () => {
      it("should return false", () => {
        const pointA: TrianglePoint.TrianglePoint = [0, 0, 2]
        const pointB: TrianglePoint.TrianglePoint = [2, 0, 0]

        const result = TrianglePoint.isAdjacent(pointA)(pointB)

        const expected = false

        expect(result).toEqual(expected)
      })
    })
  })

  describe("toCartesian", () => {
    it("should return the correct cartesian coordinates", () => {
      const pointA: TrianglePoint.TrianglePoint = [3, 0, 0]
      const pointB: TrianglePoint.TrianglePoint = [0, 3, 0]
      const pointC: TrianglePoint.TrianglePoint = [0, 0, 3]
      const pointD: TrianglePoint.TrianglePoint = [2, 0, 1]
      const pointE: TrianglePoint.TrianglePoint = [1, 0, 2]
      const pointF: TrianglePoint.TrianglePoint = [1, 1, 1]

      const resultA = TrianglePoint.toCartesian(pointA)
      const resultB = TrianglePoint.toCartesian(pointB)
      const resultC = TrianglePoint.toCartesian(pointC)
      const resultD = TrianglePoint.toCartesian(pointD)
      const resultE = TrianglePoint.toCartesian(pointE)
      const resultF = TrianglePoint.toCartesian(pointF)

      const expectedA = [0, 1]
      const expectedB = [1, 1]
      const expectedC = [0.5, 0]
      const expectedD = [1 / 6, 2 / 3]
      const expectedE = [2 / 6, 1 / 3]
      const expectedF = [3 / 6, 2 / 3]

      expect(resultA).toEqual(expectedA)
      expect(resultB).toEqual(expectedB)
      expect(resultC).toEqual(expectedC)

      expect(resultD[0]).toBeCloseTo(expectedD[0], 5)
      expect(resultD[1]).toBeCloseTo(expectedD[1], 5)
      expect(resultE[0]).toBeCloseTo(expectedE[0], 5)
      expect(resultE[1]).toBeCloseTo(expectedE[1], 5)
      expect(resultF[0]).toBeCloseTo(expectedF[0], 5)
      expect(resultF[1]).toBeCloseTo(expectedF[1], 5)
    })
  })
})
