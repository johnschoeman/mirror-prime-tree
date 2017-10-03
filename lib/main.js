import { MirrorTreeNode, MirrorNum, generateTree } from './mirror_prime_generator';
import { objectId, objIdMap, toDigits } from './mirror_util';
import { drawMirrorTree } from './mirror_tree';

import { drawTree } from './tree';
import { createMandlebrot } from './mandlebrot';
import { drawKochCurve } from './koch_curve';
import { init } from './solar_system';

window.generateTree = generateTree;
window.MirrorTreeNode = MirrorTreeNode;
window.MirrorNum = MirrorNum;
window.objectId = objectId;
window.toDigits = toDigits;

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  sizeCanvas(canvasEl);
  const ctx = canvasEl.getContext("2d");
  createTree(ctx, canvasEl);
  
  document.getElementById('mirror-options').addEventListener("change", () => {
    createTree(ctx, canvasEl);
    updateDisplay();
  });

  // drawTree(ctx,360,600,120,0,10);
  // drawKochCurve(canvasEl, ctx);
  // init(ctx);
  // createMandlebrot();
});

function createTree(ctx, canvasEl) {
  let drawOptions = getUserInput();
  drawOptions.startX = canvasEl.width/2,
  drawOptions.startY = canvasEl.height/2,

  ctx.clearRect(0,0,canvasEl.width,canvasEl.height);
  drawMirrorTree(ctx, canvasEl, drawOptions);
}

function getUserInput() {
  let seed = document.getElementById('seed-input').value;
  let iterations = document.getElementById('iterations-input').value;
  let maxNodes = document.getElementById('max-nodes-input').value;
  let maxChildNodes = document.getElementById('max-child-nodes-input').value;
  let showPrimes = document.getElementById('show-primes-input').checked;
  let showComposites = document.getElementById('show-composites-input').checked;
  let decreasingChildren = document.getElementById('decreasing-input').checked;
  let increasingChildren = document.getElementById('increasing-input').checked;

  let treeOptions = {
    seed,
    iterations,
    maxNodes: maxNodes * 1000,
    maxChildNodes,
    showPrimes,
    showComposites,
    decreasingChildren,
    increasingChildren
  };

  let t = generateTree(treeOptions);

  let length = document.getElementById('length-input').value;
  let angleSpread = document.getElementById('spread-input').value;
  let lengthMultiple = document.getElementById('length-multiple-input').value;
  let dotSize = document.getElementById('dot-size-input').value;
  console.log('dotsize', dotSize);

  let drawOptions = {
    length,
    startAngle: 0,
    angleRange: 2*Math.PI,
    angle: 0,
    currentNode: t.nodeHash[treeOptions.seed],
    angleSpread,
    dotSize,
    lengthMultiple,
  };

  return drawOptions;
}

function sizeCanvas(canvas) {

  const canvasDiv = document.getElementsByClassName("canvas-div")[0];
  // let canvasPosInfo = canvasDiv.getBoundingClientRect()
  // console.log(canvasPosInfo);
  // console.log(canvasDiv.offsetWidth);
  // console.log(canvasDiv.clientHeight);
  // if (window.innerHeight < window.innerWidth) {
  //   canvasEl.width = canvasDiv.offsetWidth * 0.9;
  //   if (canvasEl.width > 1100) {
  //     canvasEl.width = 1100;
  //   } 
  //   canvasEl.height = canvasDiv.offsetHeight * 0.9;
  // } else {
  //   canvasEl.width = canvasDiv.offsetWidth;
  //   if (canvasEl.width > 1100) {
  //     canvasEl.width = 1100;
  //   } 
  //   canvasEl.height = canvasDiv.offsetHeight;
  // }


  canvas.style.width = '1100px';
  canvas.style.height = '800px';
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  // canvas.height = window.innerHeight * 0.7;
}

function updateDisplay() {
  let iterations = document.getElementById('iterations-input').value;
  let maxChildNodes = document.getElementById('max-child-nodes-input').value;
  let length = document.getElementById('length-input').value;
  let angleSpread = document.getElementById('spread-input').value;
  let lengthMultiple = document.getElementById('length-multiple-input').value;
  let dotSize = document.getElementById('dot-size-input').value;

  document.getElementById('iterations-display').innerHTML = iterations;
  document.getElementById('max-child-nodes-display').innerHTML = maxChildNodes;
  document.getElementById('length-display').innerHTML = length;
  document.getElementById('length-multiple-display').innerHTML = lengthMultiple;
  document.getElementById('spread-display').innerHTML = angleSpread;
  document.getElementById('dot-size-display').innerHTML = dotSize;
}