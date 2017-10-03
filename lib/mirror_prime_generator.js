import * as MirrorUtil from './mirror_util';


let nodeHash = {}; // {11: {MirrorNum(10,11)}, 13: {MirrorNum(10,13)}}
let nodesWithChildren = {}; // {11: {MirrorNum(10,11)}}
let nodesWithOutChildrenQueue = []; // [7,11,13]
let nodeCount = 0;

export const generateTree = function generateTree(options) {
  nodeHash = {};
  nodesWithChildren = {};
  nodesWithOutChildrenQueue = [];
  nodeCount = 0;

  let seed = options.seed;
  let iterations = options.iterations;
  let maxNodes = options.maxNodes;

  let maxChildNodes = options.maxChildNodes;

  let rootMirrorNum = new MirrorNum(10, MirrorUtil.toDigits(seed));
  let rootNode = new MirrorTreeNode(rootMirrorNum);
  nodeHash[rootNode.decValue] = rootNode;
  nodesWithOutChildrenQueue = [rootNode];
  nodeCount++;

  let count = 0;
  let nextNode = undefined;
  
  for (count; count < iterations; count++) {
  // while (nodeCount < maxNodes && nodesWithOutChildrenQueue[0]) {
    nextNode = nodesWithOutChildrenQueue.shift();
    if (nextNode) {
      nextNode.addChildren(maxChildNodes);
      nodesWithChildren[nextNode.decValue] = nextNode;
    }
  }
//   console.log('generated tree',
//   {nodeHash, 
//     nodesWithChildren, 
//     nodesWithOutChildrenQueue,
//     nodeCount}
// );
  return {nodeHash, 
          nodesWithChildren, 
          nodesWithOutChildrenQueue,
          nodeCount};
};

export const MirrorTreeNode = class MirrorTreeNode {
  constructor(mirrorNum, parent) {
    this.mirrorNum = mirrorNum;
    this.parent = parent;
    this.children = {};

    this.decValue = mirrorNum.decValue;
    this.childCount = 0;
  }

  addChild(base, child) {
    this.children[base] = child;
  }

  // options = {
  //   showPrimes: true,
  //   showComposites: true,
  //   takeLarger: true,
  //   takeSmaller: true
  // }

  addChildren(maxChildNodes) {
    let nextChild = undefined;
    let nextMirrorNum = undefined;

    for(let i = 2; i < this.mirrorNum.decValue; i++ ) {
      nextMirrorNum = this.mirrorNum.toBase(i).reverse();
      if (nextMirrorNum.decValue > this.mirrorNum.decValue) {
      // if (true) {
        // if (nextMirrorNum.isPrime && !nodeHash[nextMirrorNum.decValue]) {
        if (this.childCount < maxChildNodes && !nodeHash[nextMirrorNum.decValue]) {
        // if (!nodeHash[nextMirrorNum.decValue]) {
          nextChild = new MirrorTreeNode(nextMirrorNum, this);
          this.addChild(i, nextChild);
          this.childCount++;
          nodeHash[nextChild.decValue] = nextChild;
          nodesWithOutChildrenQueue.push(nextChild);
          nodeCount++;
        }
      }
    }
  }

};

export const MirrorNum = class MirrorNum {
  constructor(base, digits) {
    this.base = base;
    this.digits = digits;  //note digits are in reverse order [3,2,1]
    this.decValue = this.toInt();
    this.isPrime = undefined;
    this.calcPrime();
  }

  toBase(toBase) {
    let newDigits = MirrorUtil.convertBase(this.digits, this.base, toBase);
    return new MirrorNum(toBase, newDigits);
  }

  reverse() {
    let newDigits = this.digits.reverse();
    return new MirrorNum(this.base, newDigits);
  }

  toInt() {
    return this.digits.reduce((sum, value, idx) => {
      return sum + value * (Math.pow(this.base, idx));
    });
  }

  calcPrime() {
    if (this.isPrime) {
      return this.isPrime;
    } else {
      let primeness = MirrorUtil.isPrime(this.decValue);
      this.isPrime = primeness;
      return primeness;
    }
  }
};