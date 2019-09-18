import { NumberHelpers } from "../utils"

let nodeHash = {} // {11: {MirrorNum(10,11)}, 13: {MirrorNum(10,13)}}
let nodesWithChildren = {} // {11: {MirrorNum(10,11)}}
let nodesWithoutChildrenQueue = [] // [7,11,13]
let nodeCount = 0

export const generateTree = function generateTree(options) {
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
  let rootNode = new MirrorTreeNode(rootMirrorNum)
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
      nodesWithChildren[nextNode.decValue] = nextNode
    }
  }
  return { nodeHash, nodesWithChildren, nodesWithoutChildrenQueue, nodeCount }
}

// This will mutate the given tree.
// oldTree = {nodeHash, nodesWithChildren, nodesWithoutChildrenQueue, nodeCount}
export const addOneIterationToTree = function(oldTree, options) {
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
    nodesWithChildren[nextNode.decValue] = nextNode
  }

  return { nodeHash, nodesWithChildren, nodesWithoutChildrenQueue, nodeCount }
}

export const MirrorTreeNode = class MirrorTreeNode {
  constructor(mirrorNum, parent) {
    this.mirrorNum = mirrorNum
    this.parent = parent
    this.children = {}

    this.decValue = mirrorNum.decValue
    this.childCount = 0
  }

  addChild(base, child) {
    this.children[base] = child
  }

  addChildren(
    maxChildNodes,
    showPrimes,
    showComposites,
    decreasingChildren,
    increasingChildren
  ) {
    let nextChild = undefined
    let nextMirrorNum = undefined

    let primes = undefined
    if (showPrimes && showComposites) {
      primes = "true"
    } else if (showPrimes && !showComposites) {
      primes = "nextMirrorNum.isPrime"
    } else if (!showPrimes && showComposites) {
      primes = "!nextMirrorNum.isPrime"
    } else {
      primes = "false"
    }

    for (let i = 2; i < this.mirrorNum.decValue; i++) {
      nextMirrorNum = this.mirrorNum.toBase(i).reverse()
      if (nextMirrorNum.decValue > this.mirrorNum.decValue) {
        if (
          eval(primes) &&
          this.childCount < maxChildNodes &&
          !nodeHash[nextMirrorNum.decValue]
        ) {
          nextChild = new MirrorTreeNode(nextMirrorNum, this)
          this.addChild(i, nextChild)
          this.childCount++
          nodeHash[nextChild.decValue] = nextChild
          nodesWithoutChildrenQueue.push(nextChild)
          nodeCount++
        }
      }
    }
  }
}

export const MirrorNum = class MirrorNum {
  constructor(base, digits) {
    this.base = base
    this.digits = digits //note digits are in reverse order [3,2,1]
    this.decValue = this.toInt()
    this.isPrime = undefined
    this.calcPrime()
  }

  toBase(toBase) {
    let newDigits = NumberHelpers.convertBase(this.digits, this.base, toBase)
    return new MirrorNum(toBase, newDigits)
  }

  reverse() {
    let newDigits = this.digits.reverse()
    return new MirrorNum(this.base, newDigits)
  }

  toInt() {
    return this.digits.reduce((sum, value, idx) => {
      return sum + value * Math.pow(this.base, idx)
    })
  }

  calcPrime() {
    if (this.isPrime) {
      return this.isPrime
    } else {
      let primeness = NumberHelpers.isPrime(this.decValue)
      this.isPrime = primeness
      return primeness
    }
  }
}
