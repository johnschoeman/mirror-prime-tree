import { generateTree } from './mirror_prime_generator';

export const drawMirrorTree = function drawMirrorTree(
  ctx, 
  canvas,
  {startX = 0,
   startY = 0,
   length = 50,
   startAngle = 0,
   angleRange = 2*Math.PI,
   angle = 0,
   angleSpread = 2.0,
   lengthMultiple = 1.0,
   dotSize = 2.0,
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
  ctx.arc(0, -length, dotSize, 0, 2*Math.PI);
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
    let nextLength = lengthMultiple * length;
    let nextAngleRange = angleSpread * angleRange / numChildren;
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
      dotSize,
      currentNode: node
    };
    drawMirrorTree(ctx, canvas, options);
 });

  ctx.restore();
};