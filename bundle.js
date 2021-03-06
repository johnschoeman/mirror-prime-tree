/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__numbers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas__ = __webpack_require__(6);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__canvas__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__numbers__; });






/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


let nodeHash = {} // {11: {MirrorNum(10,11)}, 13: {MirrorNum(10,13)}}
let nodesWithChildren = {} // {11: {MirrorNum(10,11)}}
let nodesWithoutChildrenQueue = [] // [7,11,13]
let nodeCount = 0

const generateTree = function generateTree(options) {
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

  let rootMirrorNum = new MirrorNum(10, __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* Numbers */].toDigits(seed))
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
/* harmony export (immutable) */ __webpack_exports__["b"] = generateTree;


// This will mutate the given tree.
// oldTree = {nodeHash, nodesWithChildren, nodesWithoutChildrenQueue, nodeCount}
const addOneIterationToTree = function(oldTree, options) {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = addOneIterationToTree;


const MirrorTreeNode = class MirrorTreeNode {
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
/* unused harmony export MirrorTreeNode */


const MirrorNum = class MirrorNum {
  constructor(base, digits) {
    this.base = base
    this.digits = digits //note digits are in reverse order [3,2,1]
    this.decValue = this.toInt()
    this.isPrime = undefined
    this.calcPrime()
  }

  toBase(toBase) {
    let newDigits = __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* Numbers */].convertBase(this.digits, this.base, toBase)
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
      let primeness = __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* Numbers */].isPrime(this.decValue)
      this.isPrime = primeness
      return primeness
    }
  }
}
/* unused harmony export MirrorNum */



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const drawMirrorTree = function drawMirrorTree(
  ctx,
  {
    startX = 0,
    startY = 0,
    length = 50,
    startAngle = 0,
    angleRange = 2 * Math.PI,
    angle = 0,
    angleSpread = 2.0,
    lengthMultiple = 1.0,
    dotSize = 2.0,
    terminalLengthMultiplier = 0.5,
    terminalAngleRange = null,
    currentNode = {},
  } = {}
) {
  ctx.beginPath()
  ctx.save()

  ctx.translate(startX, startY)
  ctx.rotate(angle)
  ctx.moveTo(0, 0)

  ctx.lineTo(0, -length)
  ctx.strokeStyle = "gray"
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, -length, dotSize, 0, 2 * Math.PI)
  if (currentNode.mirrorNum.isPrime) {
    ctx.fillStyle = "blue"
  } else {
    ctx.fillStyle = "red"
  }
  ctx.fill()

  let childNodes = currentNode.children
  let numChildren = Object.keys(childNodes).length
  if (numChildren === 0 && childNodes.constructor === Object) {
    ctx.restore()
    return
  }
  Object.values(childNodes).forEach((node, idx) => {
    let nextLength = lengthMultiple * length
    let nextAngleRange = (angleSpread * angleRange) / numChildren

    if (Object.keys(node.children).length === 0) {
      nextLength = terminalLengthMultiplier * length
      if (terminalAngleRange) {
        angleRange = terminalAngleRange
      }
    } else {
    }
    // let numerator = Math.cos(Math.PI/4 - angleRange/2)*(length + nextLength);
    // let denominator = Math.sin(Math.PI/4 - angleRange/2)*(length + nextLength) - length;
    // let nextAngleRange = 2*Math.atan(numerator / denominator);
    let options = {
      startX: 0,
      startY: -length,
      length: nextLength,
      lengthMultiple,
      angleRange: nextAngleRange,
      angle: (angleRange * idx) / numChildren - angleRange / 2,
      terminalAngleRange,
      terminalLengthMultiplier,
      dotSize,
      currentNode: node,
    }
    drawMirrorTree(ctx, options)
  })

  ctx.restore()
}
/* harmony export (immutable) */ __webpack_exports__["a"] = drawMirrorTree;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MirrorPrime__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Recaman__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__circles__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__koch_curve__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mandlebrot__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__solar_system__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tree__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__tree__);








window.addEventListener("DOMContentLoaded", () => {
  switch (document.title) {
    case "MirrorPrimeTree": {
      __WEBPACK_IMPORTED_MODULE_0__MirrorPrime__["a" /* run */]()
      break
    }
    case "Recaman": {
      Object(__WEBPACK_IMPORTED_MODULE_1__Recaman__["a" /* default */])()
      break
    }
    case "Circles": {
      Object(__WEBPACK_IMPORTED_MODULE_2__circles__["a" /* default */])()
      break
    }
    case "KochCurve": {
      Object(__WEBPACK_IMPORTED_MODULE_3__koch_curve__["a" /* default */])()
      break
    }
    case "Mandlebrot": {
      Object(__WEBPACK_IMPORTED_MODULE_4__mandlebrot__["a" /* default */])()
      break
    }
    case "SolarSystem": {
      Object(__WEBPACK_IMPORTED_MODULE_5__solar_system__["a" /* default */])()
      break
    }
    case "Tree": {
      Object(__WEBPACK_IMPORTED_MODULE_6__tree__["default"])()
      break
    }
  }
})


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mirror_prime_generator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mirror_tree__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animate_tree__ = __webpack_require__(7);




const vw = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
)
const vh = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
)

const run = () => {
  const canvasEl = document.getElementById("canvas")
  console.log("canvasEl", canvasEl)
  sizeCanvas(canvasEl)
  let ctx = canvasEl.getContext("2d")

  createTree(ctx, canvasEl)

  document.getElementById("mirror-options").addEventListener("change", () => {
    sizeCanvas(canvasEl)
    createTree(ctx, canvasEl)
    updateDisplay()
  })

  initAnimationNav(ctx, canvasEl)
  initInfoNav()
  // drawTree(ctx,360,600,120,0,10);
  // drawKochCurve(canvasEl, ctx);
  // init(ctx);
  // createMandlebrot();
  // initCircles();
  // animateCircles();
}
/* harmony export (immutable) */ __webpack_exports__["a"] = run;


function initInfoNav() {
  let info = document.getElementById("info")
  document.getElementById("info-header").addEventListener("click", () => {
    if (info.style.display === "none") {
      info.style.display = "block"
    } else {
      info.style.display = "none"
    }
  })
}

function initAnimationNav(ctx, canvasEl) {
  let startButton = document.getElementById("start-animation")
  startButton.addEventListener("click", () => {
    let { drawOptions, treeOptions, animateOptions } = getUserInput()
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    ;(drawOptions.startX = canvasEl.width / 2),
      (drawOptions.startY = canvasEl.height / 2),
      Object(__WEBPACK_IMPORTED_MODULE_2__animate_tree__["a" /* initTreeAnimation */])(ctx, drawOptions, treeOptions, animateOptions, canvasEl)
  })
}

function createTree(ctx, canvasEl) {
  let { drawOptions, treeOptions, animateOptions } = getUserInput()
  ;(drawOptions.startX = canvasEl.width / 2),
    (drawOptions.startY = canvasEl.height / 2),
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
  Object(__WEBPACK_IMPORTED_MODULE_1__mirror_tree__["a" /* drawMirrorTree */])(ctx, drawOptions)
}

function getUserInput() {
  let seed = document.getElementById("seed-input").value
  let iterations = document.getElementById("iterations-input").value
  let maxChildNodes = document.getElementById("max-child-nodes-input").value
  let showPrimes = document.getElementById("show-primes-input").checked
  let showComposites = document.getElementById("show-composites-input").checked

  let treeOptions = {
    seed,
    iterations,
    maxChildNodes,
    showPrimes,
    showComposites,
  }

  let t = Object(__WEBPACK_IMPORTED_MODULE_0__mirror_prime_generator__["b" /* generateTree */])(treeOptions)

  let length = document.getElementById("length-input").value
  let angleSpread = document.getElementById("spread-input").value
  let lengthMultiple = document.getElementById("length-multiple-input").value
  let dotSize = document.getElementById("dot-size-input").value
  let terminalLengthMultiplier = document.getElementById(
    "terminal-length-multiple-input"
  ).value
  let terminalAngleRange = document.getElementById("terminal-angle-range-input")
    .value

  let drawOptions = {
    length,
    startAngle: 0,
    angleRange: 2 * Math.PI,
    angle: 0,
    angleSpread,
    dotSize,
    lengthMultiple,
    terminalLengthMultiplier,
    terminalAngleRange,
    currentNode: t.nodeHash[treeOptions.seed],
  }

  let animateOptions = {
    currentIteration: 0,
    maxIteration: iterations,
  }

  return { drawOptions, treeOptions, animateOptions }
}

function sizeCanvas(canvas) {
  let canvasHeight, canvasWidth
  if (vw > 1100) {
    canvasWidth = "1100px"
  } else if (vw > 800) {
    canvasWidth = "800px"
  } else if (vw > 600) {
    canvasWidth = "600px"
  } else if (vw > 500) {
    canvasWidth = "500px"
  } else {
    canvasWidth = "400px"
  }

  if (vh > 1100) {
    canvasHeight = "900px"
  } else if (vh > 800) {
    canvasHeight = "900px"
  } else {
    canvasHeight = "400px"
  }

  canvas.style.width = canvasWidth
  canvas.style.height = canvasHeight

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}

function updateDisplay() {
  let seed = document.getElementById("seed-input").value
  let iterations = document.getElementById("iterations-input").value
  let maxChildNodes = document.getElementById("max-child-nodes-input").value
  let length = document.getElementById("length-input").value
  let angleSpread = document.getElementById("spread-input").value
  let lengthMultiple = document.getElementById("length-multiple-input").value
  let dotSize = document.getElementById("dot-size-input").value
  let terminalLengthMultiplier = document.getElementById(
    "terminal-length-multiple-input"
  ).value
  let terminalAngleRange = document.getElementById("terminal-angle-range-input")
    .value

  document.getElementById("seed-display").innerText = seed
  document.getElementById("iterations-display").innerText = iterations
  document.getElementById("max-child-nodes-display").innerText = maxChildNodes
  document.getElementById("length-display").innerText = length
  document.getElementById("length-multiple-display").innerText = lengthMultiple
  document.getElementById("spread-display").innerText = angleSpread
  document.getElementById("dot-size-display").innerText = dotSize
  document.getElementById(
    "terminal-length-multiple-display"
  ).innerText = terminalLengthMultiplier
  document.getElementById(
    "terminal-angle-range-display"
  ).innerText = terminalAngleRange
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const convertBase = function convertBase(digits, fromBase, toBase) {
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
/* harmony export (immutable) */ __webpack_exports__["convertBase"] = convertBase;


const isPrime = function isPrime(num) {
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
/* harmony export (immutable) */ __webpack_exports__["isPrime"] = isPrime;


const toDigits = function toDigits(num) {
  let digits = []
  while (num > 0) {
    digits.push(num % 10)
    num = Math.floor(num / 10)
  }
  return digits //returns digits in reverse
}
/* harmony export (immutable) */ __webpack_exports__["toDigits"] = toDigits;


let objIdMap = new WeakMap()
let objectCount = 0

const objectId = function objectId(object) {
  if (!objIdMap.has(object)) {
    objIdMap.set(object, ++objectCount)
  }
  return objIdMap.get(object)
}
/* harmony export (immutable) */ __webpack_exports__["objectId"] = objectId;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["sizeCanvas"] = sizeCanvas;
function sizeCanvas(canvas) {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  let canvasHeight, canvasWidth
  if (vw > 1100) {
    canvasWidth = "1100px"
  } else if (vw > 800) {
    canvasWidth = "800px"
  } else if (vw > 600) {
    canvasWidth = "600px"
  } else if (vw > 500) {
    canvasWidth = "500px"
  } else {
    canvasWidth = "400px"
  }

  if (vh > 1100) {
    canvasHeight = "900px"
  } else if (vh > 800) {
    canvasHeight = "900px"
  } else {
    canvasHeight = "400px"
  }

  canvas.style.width = canvasWidth
  canvas.style.height = canvasHeight

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}

const sizeCanvasMax = canvas => {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  canvas.style.width = vw
  canvas.style.height = vh

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}
/* harmony export (immutable) */ __webpack_exports__["sizeCanvasMax"] = sizeCanvasMax;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mirror_prime_generator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mirror_tree__ = __webpack_require__(2);



// let treeOptions = {
//   seed,
//   iterations,
//   maxChildNodes,
//   showPrimes,
//   showComposites
// };

// let t = generateTree(treeOptions);

// let drawOptions = {
//   length,
//   startAngle: 0,
//   angleRange: 2*Math.PI,
//   angle: 0,
//   angleSpread,
//   dotSize,
//   lengthMultiple,
//   terminalLengthMultiplier,
//   terminalAngleRange,
//   currentNode: t.nodeHash[treeOptions.seed]
// };

// let animateOptions = {
//   currentIteration: 0,
//   maxIteration: iterations
// };

let animationId
let currentTree
let t = undefined

const initTreeAnimation = function initTreeAnimation(
  ctx,
  drawOptions,
  treeOptions,
  animateOptions,
  canvas
) {
  animationId = window.requestAnimationFrame(
    animateMirrorTree(ctx, drawOptions, treeOptions, animateOptions, canvas)
  )

  let stopButton = document.getElementById("stop-animation")

  stopButton.addEventListener("click", () => {
    console.log("clicked stop")
    window.cancelAnimationFrame(animationId)
    t = undefined
  })
}
/* harmony export (immutable) */ __webpack_exports__["a"] = initTreeAnimation;


// function animateMirrorTree(ctx, drawOptions, treeOptions, animateOptions, canvas) {
//   // console.log('in animation step');
//   // console.log('current iteration: ', animateOptions.currentIteration);
//   return () => {
//     treeOptions.iterations = animateOptions.currentIteration;
//     animateOptions.currentIteration++;
//     if (animateOptions.currentIteration - 2 === parseInt(animateOptions.maxIteration)) {
//       return;
//     }
//     ctx.clearRect(0,0, canvas.width, canvas.height);
//     let t = generateTree(treeOptions);
//     drawOptions.currentNode = t.nodeHash[treeOptions.seed];
//     drawMirrorTree(ctx, drawOptions);
//     animationId = window.requestAnimationFrame(animateMirrorTree(ctx, drawOptions, treeOptions, animateOptions, canvas), 1000/60);
//   };
// }

function animateMirrorTree(
  ctx,
  drawOptions,
  treeOptions,
  animateOptions,
  canvas
) {
  // console.log('in animation step');
  // console.log('current iteration: ', animateOptions.currentIteration);
  return () => {
    treeOptions.iterations = animateOptions.currentIteration
    animateOptions.currentIteration++
    // if (animateOptions.currentIteration - 2 === parseInt(animateOptions.maxIteration)) {
    //   return;
    // }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (t == undefined) {
      t = Object(__WEBPACK_IMPORTED_MODULE_0__mirror_prime_generator__["b" /* generateTree */])(treeOptions)
    } else {
      t = Object(__WEBPACK_IMPORTED_MODULE_0__mirror_prime_generator__["a" /* addOneIterationToTree */])(t, treeOptions)
    }
    drawOptions.currentNode = t.nodeHash[treeOptions.seed]
    Object(__WEBPACK_IMPORTED_MODULE_1__mirror_tree__["a" /* drawMirrorTree */])(ctx, drawOptions)
    animationId = window.requestAnimationFrame(
      animateMirrorTree(ctx, drawOptions, treeOptions, animateOptions, canvas),
      1000 / 60
    )
  }
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const initRecaman = () => {}

/* harmony default export */ __webpack_exports__["a"] = (initRecaman);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let canvas, ctx, toggle
let animationId

const initCircles = function initCircles() {
  console.log("initing circles")
  canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512

  ctx = canvas.getContext("2d")

  document.body.appendChild(canvas)

  let stopButton, startButton
  stopButton = document.createElement("button")
  startButton = document.createElement("button")
  stopButton.innerHTML = "Stop"
  startButton.innerHTML = "Start"

  document.body.appendChild(stopButton)
  document.body.appendChild(startButton)

  animationId = window.requestAnimationFrame(animateCircles)

  stopButton.addEventListener("click", () => {
    window.cancelAnimationFrame(animationId)
  })
  startButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    animationId = window.requestAnimationFrame(animateCircles)
  })
}

const animateCircles = function animateCircles() {
  animationId = window.requestAnimationFrame(animateCircles)
  draw()
}

function draw() {
  let time = new Date().getTime() * 0.002
  let x = Math.sin(time) * 192 + 256
  let y = Math.cos(time * 0.9) * 192 + 256
  toggle = !toggle

  ctx.fillStyle = toggle ? "rgb(200,200,20)" : "rgb(20,20,200)"
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
}

/* harmony default export */ __webpack_exports__["a"] = (initCircles);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


const generateSequence = function generateSequence() {
  let sequence = "0"
  for (let i = 0; i < 17; i++) {
    let parts = sequence.split("")
    let complement = ""
    for (let j = 0; j < parts.length; j++) {
      complement = complement + (parts[j] === "0" ? "1" : "0")
    }
    sequence += complement
  }
  return sequence
}

const drawKochCurve = function drawKochCurve(myCanvas, ctx) {
  var sequence = generateSequence()
  var parts = sequence.split("")
  ctx.translate(0, myCanvas.height)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] === "0") {
      ctx.translate(0, 10)
      ctx.lineTo(0, 10)
    } else {
      ctx.rotate(Math.PI / 3)
    }
  }
  ctx.stroke()
}

const initKochCurve = () => {
  const canvasEl = document.getElementById("canvas")
  __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Canvas */].sizeCanvasMax(canvasEl)
  let ctx = canvasEl.getContext("2d")
  drawKochCurve(canvasEl, ctx)
}

/* harmony default export */ __webpack_exports__["a"] = (initKochCurve);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


const createMandlebrot = function createMandlebrot() {
  let myCanvas = document.createElement("canvas")
  myCanvas.width = 600
  myCanvas.height = 600
  document.body.appendChild(myCanvas)
  let ctx = myCanvas.getContext("2d")

  drawMandlebrot(myCanvas, ctx)
}

const checkIfBelongsToMandlebrotSet = function checkIfBelongsToMandlebrotSet(
  x,
  y
) {
  let realComponentOfResult = x
  let imaginaryComponentOfResult = y
  let maxIterations = 300
  for (let i = 0; i < maxIterations; i++) {
    var tempRealComponent =
      realComponentOfResult * realComponentOfResult -
      imaginaryComponentOfResult * imaginaryComponentOfResult +
      x

    var tempImaginaryComponent =
      2 * realComponentOfResult * imaginaryComponentOfResult + y

    realComponentOfResult = tempRealComponent
    imaginaryComponentOfResult = tempImaginaryComponent
    if (realComponentOfResult * imaginaryComponentOfResult > 5) {
      return (i / maxIterations) * 100
    }
  }

  return 0
}

const drawMandlebrot = function drawMandlebrot(myCanvas, ctx) {
  let magnificationFactor = 200
  let panX = 2
  let panY = 1

  for (let x = 0; x < myCanvas.width; x++) {
    for (let y = 0; y < myCanvas.height; y++) {
      let belongsToSet = checkIfBelongsToMandlebrotSet(
        x / magnificationFactor - panX,
        y / magnificationFactor - panY
      )
      if (belongsToSet == 0) {
        ctx.fillStyle = "#000"
        ctx.fillRect(x, y, 1, 1)
      } else {
        ctx.fillStyle = "hsl(0, 100%, " + belongsToSet + "%)"
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }
}

const run = () => {
  const canvasEl = document.getElementById("canvas")
  __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Canvas */].sizeCanvasMax(canvasEl)
  let ctx = canvasEl.getContext("2d")

  drawMandlebrot(canvasEl, ctx)
}
/* unused harmony export run */


/* harmony default export */ __webpack_exports__["a"] = (run);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


let sun = new Image()
let moon = new Image()
let earth = new Image()

const init = function init(ctx) {
  sun.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png"
  moon.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png"
  earth.src = "https://mdn.mozillademos.org/files/1429/Canvas_earth.png"
  window.requestAnimationFrame(draw(ctx))
}

function draw(ctx) {
  return () => {
    ctx.globalCompositeOperation = "destination-over"
    ctx.clearRect(0, 0, 300, 300)

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
    ctx.strokeStyle = "rgba(0,153,255,0.4)"
    ctx.save()
    ctx.translate(150, 150)

    let time = new Date()
    ctx.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()
    )
    ctx.translate(105, 0)
    ctx.fillRect(0, -12, 50, 24) //Shadow
    ctx.drawImage(earth, -12, -12)

    //Moon
    ctx.save()
    ctx.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()
    )
    ctx.translate(0, 28.5)
    ctx.drawImage(moon, -3.5, -3.5)
    ctx.restore()

    ctx.restore()

    ctx.beginPath()
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false) //Earth Orbit

    ctx.drawImage(sun, 0, 0, 300, 300)

    window.requestAnimationFrame(draw(ctx))
  }
}

const initSolarSystem = () => {
  console.log("Running solar system code")
  const canvasEl = document.getElementById("canvas")
  __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Canvas */].sizeCanvasMax(canvasEl)
  let ctx = canvasEl.getContext("2d")
  init(ctx)
}

/* harmony default export */ __webpack_exports__["a"] = (initSolarSystem);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/john/workspace/mirror-prime-tree/src/tree.js'");

/***/ })
/******/ ]);