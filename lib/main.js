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
  canvasEl.width = 800;
  canvasEl.height = 550;
  const ctx = canvasEl.getContext("2d");

  createTree(ctx, canvasEl);
  
  document.getElementById('mirror-options').addEventListener("change", () => {
    createTree(ctx, canvasEl);
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
  
  let treeOptions = {
    seed,
    iterations,
    maxNodes: maxNodes * 1000,
    maxChildNodes: 20
  };

  let t = generateTree(treeOptions);

  let length = document.getElementById('length-input').value;
  let angleSpread = document.getElementById('spread-input').value;
  let lengthMultiple = document.getElementById('length-multiple-input').value;
  
  let drawOptions = {
    length,
    startAngle: 0,
    angleRange: 2*Math.PI,
    angle: 0,
    currentNode: t.nodeHash[treeOptions.seed],
    angleSpread,
    lengthMultiple,
  };

  return drawOptions;
}

