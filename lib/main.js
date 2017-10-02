import { MirrorTreeNode, MirrorNum } from './mirror_prime';
import { objectId, objIdMap } from './mirror_util';

import { drawTree } from './tree';
import { createMandlebrot } from './mandlebrot';
import { drawKochCurve } from './koch_curve';
import { init } from './solar_system';

window.MirrorTreeNode = MirrorTreeNode;
window.MirrorNum = MirrorNum;
window.objectId = objectId;

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 600;
  canvasEl.height = 700;
  const ctx = canvasEl.getContext("2d");

  // drawTree(ctx,360,600,120,0,10);
  // drawKochCurve(canvasEl, ctx);
  init(ctx);

  // createMandlebrot();
});


