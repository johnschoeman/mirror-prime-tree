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
  canvasEl.width = 1000;
  canvasEl.height = 1000;
  const ctx = canvasEl.getContext("2d");
  
  let seed = 11;
  let t = generateTree(seed, 80); // {nodeHash, nodesWithChildren, nodesWithOutChildrenQueue}
  
  let options = {
    startX: canvasEl.width/2,
    startY: canvasEl.height/2,
    length: 50,
    startAngle: 0,
    angleRange: 2*Math.PI,
    angle: 0, 
    nodeTree: t,
    currentNode: t.nodeHash[seed]
  };

  // drawTree(ctx,360,600,120,0,10);
  drawMirrorTree(ctx, options);

  // drawKochCurve(canvasEl, ctx);
  // init(ctx);
  // createMandlebrot();

});


