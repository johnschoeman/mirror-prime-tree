import * as MirrorUtil from './mirror_util';


let nodeHash = {}; // {11: {MirrorNum(10,11)}, 13: {MirrorNum(10,13)}}
let nodesWithChildren = {}; // {11: {MirrorNum(10,11)}}
let nodesWithOutChildrenQueue = []; // [7,11,13]

export const generateTree = function generateTree(seed) {
  let rootMirrorNum = new MirrorNum(10, MirrorUtil.toDigits(seed));
  let rootNode = new MirrorTreeNode(rootMirrorNum);
  nodeHash[rootNode.decValue] = rootNode;

  rootNode.addStrictlyGreaterChildren();
  nodesWithChildren[rootNode.decValue] = rootNode;

  let count = 0;
  let nextNode = undefined;
  for (count; count < 100; count++) {
    nextNode = nodesWithOutChildrenQueue.shift();
    if (nextNode) {
      nextNode.addStrictlyGreaterChildren();
      nodesWithChildren[nextNode.decValue] = nextNode;
    }
  }

  return {nodeHash, nodesWithChildren, nodesWithOutChildrenQueue};
};

export const MirrorTreeNode = class MirrorTreeNode {
  constructor(mirrorNum, parent) {
    this.mirrorNum = mirrorNum;
    this.parent = parent;
    this.children = {};

    this.decValue = mirrorNum.decValue;
  }

  addChild(base, child) {
    this.children[base] = child;
  }

  addAllChildren() {
    let nextChild = undefined;
    let nextMirrorNum = undefined;
    for(let i = 2; i < this.mirrorNum.decValue; i++ ) {
      nextMirrorNum = this.mirrorNum.toBase(i).reverse();
      nextChild = new MirrorTreeNode(nextMirrorNum, this);
      this.addChild(i, nextChild);
    }
  }

  addStrictlyGreaterChildren() {
    let nextChild = undefined;
    let nextMirrorNum = undefined;
    for(let i = 2; i < this.mirrorNum.decValue; i++ ) {
      nextMirrorNum = this.mirrorNum.toBase(i).reverse();
      if (nextMirrorNum.decValue > this.mirrorNum.decValue) {
      // if (true) {
        if (nodeHash && !nodeHash[nextMirrorNum.decValue]) {
          nextChild = new MirrorTreeNode(nextMirrorNum, this);
          this.addChild(i, nextChild);
          nodeHash[nextChild.decValue] = nextChild;
          nodesWithOutChildrenQueue.push(nextChild);
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