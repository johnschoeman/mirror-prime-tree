import { NumberHelpers } from "../../utils"

let nodeHash = {} // {11: {MirrorNum(10,11)}, 13: {MirrorNum(10,13)}}
let nodesWithChildren = {} // {11: {MirrorNum(10,11)}}
let nodesWithoutChildrenQueue = [] // [7,11,13]
let nodeCount = 0

export const generateTree = function generateTree(options: any) {
  nodeHash = {}
  nodesWithChildren = {}
  nodesWithoutChildrenQueue = []
  nodeCount = 0

  let seed = options.seed
  let iterations = options.iterations
  let maxNodes = options.maxNodes
  let showPrimes = options.showPrimes
  let showComposites = options.showComposites
  let decreasingChildren = options.decreasingChildren
  let increasingChildren = options.increasingChildren

  let maxChildNodes = options.maxChildNodes

  let rootMirrorNum = new MirrorNum(10, NumberHelpers.toDigits(seed))
  let rootNode = new MirrorTreeNode(rootMirrorNum, null)
  // @ts-ignore
  nodeHash[rootNode.decValue] = rootNode
  nodesWithoutChildrenQueue = [rootNode]
  nodeCount++

  let count = 0
  let nextNode = undefined

  for (count; count < iterations; count++) {
    nextNode = nodesWithoutChildrenQueue.shift()
    if (nextNode) {
      nextNode.addChildren(
        maxChildNodes,
        showPrimes,
        showComposites,
        decreasingChildren,
        increasingChildren
      )
      // @ts-ignore
      nodesWithChildren[nextNode.decValue] = nextNode
    }
  }
  return { nodeHash, nodesWithChildren, nodesWithoutChildrenQueue, nodeCount }
}

// This will mutate the given tree.
// oldTree = {nodeHash, nodesWithChildren, nodesWithoutChildrenQueue, nodeCount}
export const addOneIterationToTree = function (oldTree: any, options: any) {
  nodeHash = oldTree.nodeHash
  nodesWithChildren = oldTree.nodesWithChildren
  nodesWithoutChildrenQueue = oldTree.nodesWithoutChildrenQueue
  nodeCount = oldTree.nodeCount

  let maxChildNodes = options.maxChildNodes
  let showPrimes = options.showPrimes
  let showComposites = options.showComposites

  let nextNode = undefined

  nextNode = nodesWithoutChildrenQueue.shift()
  if (nextNode) {
    nextNode.addChildren(maxChildNodes, showPrimes, showComposites)
    // @ts-ignore
    nodesWithChildren[nextNode.decValue] = nextNode
  }

  return { nodeHash, nodesWithChildren, nodesWithoutChildrenQueue, nodeCount }
}

export const MirrorTreeNode = class MirrorTreeNode {
  constructor(mirrorNum: any, parent: any) {
    // @ts-ignore
    this.mirrorNum = mirrorNum
    // @ts-ignore
    this.parent = parent
    // @ts-ignore
    this.children = {}

    // @ts-ignore
    this.decValue = mirrorNum.decValue
    // @ts-ignore
    this.childCount = 0
  }

  addChild(base: any, child: any) {
    // @ts-ignore
    this.children[base] = child
  }

  addChildren(
    maxChildNodes: any,
    showPrimes: any,
    showComposites: any,
    decreasingChildren: any,
    increasingChildren: any
  ) {
    let nextChild = undefined
    let nextMirrorNum = undefined

    const primes = (nextMirrorNum: any) => {
      if (showPrimes && showComposites) {
        return true
      } else if (showPrimes && !showComposites) {
        return nextMirrorNum.isPrime
      } else if (!showPrimes && showComposites) {
        return !nextMirrorNum.isPrime
      } else {
        return false
      }
    }

    // @ts-ignore
    for (let i = 2; i < this.mirrorNum.decValue; i++) {
      // @ts-ignore
      nextMirrorNum = this.mirrorNum.toBase(i).reverse()
      // @ts-ignore
      if (nextMirrorNum.decValue > this.mirrorNum.decValue) {
        if (
          primes(nextMirrorNum) &&
          // @ts-ignore
          this.childCount < maxChildNodes &&
          // @ts-ignore
          !nodeHash[nextMirrorNum.decValue]
        ) {
          nextChild = new MirrorTreeNode(nextMirrorNum, this)
          this.addChild(i, nextChild)
          // @ts-ignore
          this.childCount++
          // @ts-ignore
          nodeHash[nextChild.decValue] = nextChild
          nodesWithoutChildrenQueue.push(nextChild)
          nodeCount++
        }
      }
    }
  }
}

export const MirrorNum = class MirrorNum {
  constructor(base: any, digits: any) {
    // @ts-ignore
    this.base = base
    // @ts-ignore
    this.digits = digits //note digits are in reverse order [3,2,1]
    // @ts-ignore
    this.decValue = this.toInt()
    // @ts-ignore
    this.isPrime = undefined
    this.calcPrime()
  }

  toBase(toBase: any) {
    // @ts-ignore
    let newDigits = NumberHelpers.convertBase(this.digits, this.base, toBase)
    return new MirrorNum(toBase, newDigits)
  }

  reverse() {
    // @ts-ignore
    let newDigits = this.digits.reverse()
    // @ts-ignore
    return new MirrorNum(this.base, newDigits)
  }

  toInt() {
    // @ts-ignore
    return this.digits.reduce((sum, value, idx) => {
      // @ts-ignore
      return sum + value * Math.pow(this.base, idx)
    })
  }

  calcPrime() {
    // @ts-ignore
    if (this.isPrime) {
      // @ts-ignore
      return this.isPrime
    } else {
      // @ts-ignore
      let primeness = NumberHelpers.isPrime(this.decValue)
      // @ts-ignore
      this.isPrime = primeness
      return primeness
    }
  }
}
