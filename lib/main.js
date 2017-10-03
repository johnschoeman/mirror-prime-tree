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
  
  let seed = 11;
  let t = generateTree(seed, 120); // {nodeHash, nodesWithChildren, nodesWithOutChildrenQueue}
  
  let options = {
    startX: canvasEl.width/2,
    startY: canvasEl.height/2,
    length: 50,
    startAngle: 0,
    angleRange: 2*Math.PI,
    angle: 0,
    currentNode: t.nodeHash[seed]
  };

  // drawTree(ctx,360,600,120,0,10);
  drawMirrorTree(ctx, canvasEl, options);

  document.getElementById('mirror-options').addEventListener("change", () => {
    // seed = document.getElementById('seed-input').value;
    // console.log(seed);
    // t = generateTree(seed, 40);
    // console.log(t);
    options = getUserInput();
    console.log(options);
    options.startX = canvasEl.width/2,
    options.startY = canvasEl.height/2,

    ctx.clearRect(0,0,canvasEl.width,canvasEl.height);
    drawMirrorTree(ctx, canvasEl, options);
  });
  // drawKochCurve(canvasEl, ctx);
  // init(ctx);
  // createMandlebrot();

});

function getUserInput() {
  let seed = document.getElementById('seed-input').value;
  let iterations = document.getElementById('iterations-input').value;
  let length = document.getElementById('length-input').value;
  let t = generateTree(seed, iterations);

  return {
    length,
    startAngle: 0,
    angleRange: 2*Math.PI,
    angle: 0,
    currentNode: t.nodeHash[seed]
  };
}
