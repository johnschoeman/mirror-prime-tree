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
  canvasEl.width = 600;
  canvasEl.height = 700;
  const ctx = canvasEl.getContext("2d");

  let t = generateTree(7); // {nodeHash, nodesWithChildren, nodesWithOutChildrenQueue}
  
  let options = {
    startX: canvasEl.width/2,
    startY: canvasEl.height/2,
    len: 20,
    startAngle: 0,
    angleRange: 2*Math.PI,
    nodeTree: t
  };

  drawMirrorTree(ctx, options);

  // drawTree(ctx,360,600,120,0,10);
  // drawKochCurve(canvasEl, ctx);
  // init(ctx);
  // createMandlebrot();

});


