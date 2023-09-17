import { IO } from "../fpts"

export type ArcPair = {
  lft: number
  rgt: number
}

export const makePairs = (array: Array<number>) => {
  const result: Array<ArcPair> = new Array<ArcPair>()
  for (let i = 0; i < array.length - 1; i++) {
    const left = array[i]
    const right = array[i + 1]
    if (left < right) {
      result.push({ lft: left, rgt: right })
    } else {
      result.push({ lft: right, rgt: left })
    }
  }
  return result
}

export const shuffle =
  <T>(array: T[]): IO.IO<T[]> =>
  () => {
    const source = [...array]
    for (let i = source.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[source[i], source[j]] = [source[j], source[i]]
    }
    return source
  }
