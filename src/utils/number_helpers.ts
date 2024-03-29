export const convertBase = function convertBase(
  digits: number[],
  fromBase: number,
  toBase: number
) {
  let decValue = digits.reduce((sum, value, idx) => {
    return sum + value * Math.pow(fromBase, idx)
  })

  let resDigits = []

  while (decValue > 0) {
    resDigits.push(decValue % toBase)
    decValue = Math.floor(decValue / toBase)
  }

  return resDigits
}

export const isPrime = function isPrime(num: number) {
  if (num <= 1) {
    return false
  }
  if (num === 2) {
    return true
  }
  if (num % 2 === 0) {
    return false
  }

  for (let i = 3; i <= Math.sqrt(num) + 2; i = i + 2) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}

export const toDigits = function toDigits(num: number) {
  let digits = []
  while (num > 0) {
    digits.push(num % 10)
    num = Math.floor(num / 10)
  }
  return digits //returns digits in reverse
}

let objIdMap = new WeakMap()
let objectCount = 0

export const objectId = function objectId(object: Record<string, any>) {
  if (!objIdMap.has(object)) {
    objIdMap.set(object, ++objectCount)
  }
  return objIdMap.get(object)
}

export const randomInteger = (high: number = 100, low: number = 0) => {
  return Math.floor(Math.random() * (high - low)) + low
}
