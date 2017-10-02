import { generateTree } from './mirror_prime_generator';

let t = generateTree(7); // {nodeHash, nodesWithChildren, nodesWithOutChildrenQueue}

let defaultOptions = {
  startX: 0,
  startY: 0,
  length: 20,
  startAngle: 0,
  angleRange: 2*Math.PI,
  nodeTree: {},
  currentNode: {}
};

export const drawMirrorTree = function drawMirrorTree(
  ctx, 
  {startX = 0,
   startY = 0,
   length = 20,
   startAngle = 0,
   angleRange = 2*Math.PI,
   angle = 0,
   nodeTree = {},
   currentNode = {}} = {}
  ) {

  ctx.beginPath();
  ctx.save();

  ctx.translate(startX, startY);
  ctx.rotate(angle);
  ctx.moveTo(0,0);

  ctx.lineTo(0, -length);
  ctx.strokeStyle = "gray";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, -length, 2, 0, 2*Math.PI);
  if (currentNode.mirrorNum.isPrime) {
    ctx.fillStyle = "blue";
  } else {
    ctx.fillStyle = "red";
  }
  ctx.fill();

  let childNodes = currentNode.children;
  let numChildren = Object.keys(childNodes).length;
  if (numChildren === 0 && childNodes.constructor === Object) {
    ctx.restore();
    return;
  }
  Object.values(childNodes).forEach ((node, idx) => {    
    let nextLength = 1.2 * length;
    let nextAngleRange = 2 * angleRange / numChildren;
    if (Object.keys(node.children).length === 0) {
      nextLength = .5 * length;
      // angleRange = 2 * Math.PI;
    } else {
      
    }
    // let numerator = Math.cos(Math.PI/4 - angleRange/2)*(length + nextLength);
    // let denominator = Math.sin(Math.PI/4 - angleRange/2)*(length + nextLength) - length;
    // let nextAngleRange = 2*Math.atan(numerator / denominator);
    let options = {
      startX: 0,
      startY: -length,
      length: nextLength,
      angleRange: nextAngleRange,
      // angleRange: 0.9 * angleRange,
      angle: (angleRange * (idx) / numChildren) - angleRange/2,
      nodeTree: t,
      currentNode: node
    };
    drawMirrorTree(ctx, options);
 });

  ctx.restore();
};