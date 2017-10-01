// import { convertBase, isPrime, toDigits } from './mirror_util';
import * as MirrorUtil from './mirror_util';


class MirrorTreeNode {
  constructor(mirrorNum, parent) {
    this.mirrorNum = mirrorNum;
    this.parent = parent;
    this.children = {};
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
      nextChild = this.mirrorNum.toBase(i).reverse();
      if (nextChild.decValue > this.mirrorNum.decValue) {
        nextMirrorNum = this.mirrorNum.toBase(i).reverse();
        nextChild = new MirrorTreeNode(nextMirrorNum, this);
        this.addChild(i, nextChild);
      }
    }
  }


}

class MirrorNum {
  constructor(base, digits) {
    this.base = base;
    this.digits = digits;  //note digits are in reverse order
    this.decValue = this.toInt();
    this.isPrime = undefined;
  }

  toBase(toBase) {
    let newDigits = convertBase(this.digits, this.base, toBase);
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
      let primeness = isPrime(this.toInt());
      this.isPrime = primeness;
      return primeness;
    }
  }
}



let d = toDigits(11);
let m = new MirrorNum(10, d);


let n = new MirrorTreeNode(m, null);
console.log(n);
n.addStrictlyGreaterChildren();
console.log(n.children);