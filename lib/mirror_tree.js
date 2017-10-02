import { generateTree } from './mirror_prime_generator';

let t = generateTree(7); // {nodeHash, nodesWithChildren, nodesWithOutChildrenQueue}

let defaultOptions = {
  startX: 0,
  startY: 0,
  startAngle: 0,
  len: 20,
  angleRange: 2*Math.PI,
  nodeTree: {}
};

export const drawMirrorTree = function drawMirrorTree(ctx, options = defaultOptions) {
  ctx.beginPath();
  ctx.save();



};