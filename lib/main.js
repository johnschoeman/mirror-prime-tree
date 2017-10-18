import { MirrorTreeNode, MirrorNum, generateTree } from './mirror_prime_generator';
import { objectId, objIdMap, toDigits } from './mirror_util';
import { drawMirrorTree } from './mirror_tree';
import { initTreeAnimation } from './animate_tree';

import { drawTree } from './tree';
import { createMandlebrot } from './mandlebrot';
import { drawKochCurve } from './koch_curve';
import { init } from './solar_system';
import { initCircles, animateCircles } from './circles';

const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

document.addEventListener("DOMContentLoaded", function(){
  let canvasEl = document.getElementById("canvas");
  sizeCanvas(canvasEl);
  let ctx = canvasEl.getContext("2d");
  
  createTree(ctx, canvasEl);
  
  document.getElementById('mirror-options').addEventListener("change", () => {
    sizeCanvas(canvasEl);
    createTree(ctx, canvasEl);
    updateDisplay();
  });
  
  initAnimationNav(ctx, canvasEl);
  initInfoNav();
  // drawTree(ctx,360,600,120,0,10);
  // drawKochCurve(canvasEl, ctx);
  // init(ctx);
  // createMandlebrot();
  // initCircles();
  // animateCircles();
});

function initInfoNav() {
  let info = document.getElementById('info');
  document.getElementById('info-header').addEventListener("click", () => {
    if (info.style.display === 'none') {
      info.style.display = 'block';
    } else {
      info.style.display = 'none';
    }
  });
}

function initAnimationNav(ctx, canvasEl) {
  let startButton = document.getElementById('start-animation');
  startButton.addEventListener("click", () => {
    let {drawOptions, treeOptions, animateOptions} = getUserInput();
    ctx.clearRect(0,0,canvasEl.width,canvasEl.height);
    drawOptions.startX = canvasEl.width/2,
    drawOptions.startY = canvasEl.height/2,
    initTreeAnimation(ctx, drawOptions, treeOptions, animateOptions, canvasEl);
  });
}

function createTree(ctx, canvasEl) {
  let {drawOptions, treeOptions, animateOptions} = getUserInput();
  drawOptions.startX = canvasEl.width/2,
  drawOptions.startY = canvasEl.height/2,

  ctx.clearRect(0,0,canvasEl.width,canvasEl.height);
  drawMirrorTree(ctx, drawOptions);
}

function getUserInput() {
  let seed = document.getElementById('seed-input').value;
  let iterations = document.getElementById('iterations-input').value;
  let maxChildNodes = document.getElementById('max-child-nodes-input').value;
  let showPrimes = document.getElementById('show-primes-input').checked;
  let showComposites = document.getElementById('show-composites-input').checked;
  
  let treeOptions = {
    seed,
    iterations,
    maxChildNodes,
    showPrimes,
    showComposites
  };
  
  let t = generateTree(treeOptions);
  
  let length = document.getElementById('length-input').value;
  let angleSpread = document.getElementById('spread-input').value;
  let lengthMultiple = document.getElementById('length-multiple-input').value;
  let dotSize = document.getElementById('dot-size-input').value;
  let terminalLengthMultiplier = document.getElementById('terminal-length-multiple-input').value;
  let terminalAngleRange = document.getElementById('terminal-angle-range-input').value;
  
  
  let drawOptions = {
    length,
    startAngle: 0,
    angleRange: 2*Math.PI,
    angle: 0,
    angleSpread,
    dotSize,
    lengthMultiple,
    terminalLengthMultiplier,
    terminalAngleRange,
    currentNode: t.nodeHash[treeOptions.seed]
  };

  let animateOptions = {
    currentIteration: 0,
    maxIteration: iterations
  };

  return {drawOptions, treeOptions, animateOptions};
}

function sizeCanvas(canvas) {

  let canvasDiv = document.getElementsByClassName("canvas-div")[0];

  console.log('vh', vh);
  console.log('vw', vw);
  let canvasHeight, canvasWidth;
  if (vw > 1100) {
    canvasWidth = '1100px';
  } else if (vw > 800) {
    canvasWidth = '800px';
  } else if (vw > 600) {
    canvasWidth = '600px';
  } else if (vw > 500) {
    canvasWidth = '500px';
  } else {
    canvasWidth = '400px';
  }

  if (vh > 1100) {
    canvasHeight = '1100px';
  } else if (vh > 800) {
    canvasHeight = '1100px';
  } else {
    canvasHeight = '400px';
  }

  canvas.style.width = canvasWidth;
  canvas.style.height = canvasHeight;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

}

function updateDisplay() {
  let seed = document.getElementById('seed-input').value;
  let iterations = document.getElementById('iterations-input').value;
  let maxChildNodes = document.getElementById('max-child-nodes-input').value;
  let length = document.getElementById('length-input').value;
  let angleSpread = document.getElementById('spread-input').value;
  let lengthMultiple = document.getElementById('length-multiple-input').value;
  let dotSize = document.getElementById('dot-size-input').value;
  let terminalLengthMultiplier = document.getElementById('terminal-length-multiple-input').value;
  let terminalAngleRange = document.getElementById('terminal-angle-range-input').value;

  document.getElementById('seed-display').innerText = seed;
  document.getElementById('iterations-display').innerText = iterations;
  document.getElementById('max-child-nodes-display').innerText = maxChildNodes;
  document.getElementById('length-display').innerText = length;
  document.getElementById('length-multiple-display').innerText = lengthMultiple;
  document.getElementById('spread-display').innerText = angleSpread;
  document.getElementById('dot-size-display').innerText = dotSize;
  document.getElementById('terminal-length-multiple-display').innerText = terminalLengthMultiplier;
  document.getElementById('terminal-angle-range-display').innerText = terminalAngleRange;
}