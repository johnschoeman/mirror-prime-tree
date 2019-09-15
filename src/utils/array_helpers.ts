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
