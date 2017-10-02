export const drawTree = function drawTree(ctx, startX, startY, len, angle, branchWidth) {
  ctx.beginPath();
  ctx.save();

  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI/180);
  ctx.moveTo(0, 0);

  // ctx.lineTo(0, -len);

  if (angle > 0 ) {
    ctx.bezierCurveTo(10 * len/120, len/2, 10*len/120, len/2, 0, -len);
  } else {
    ctx.bezierCurveTo(-10 * len/120, -len/2, 10*len/120, -len/2, 0, -len);
  }

  ctx.lineWidth = branchWidth;
  ctx.shadowBlur = 1;
  ctx.shadowColor = "rgba(0,0,0,0.75)";
  ctx.stroke();

  if (len < 10) {
    ctx.beginPath();
    ctx.arc(0, -len, 10, 0, Math.PI/2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.restore();
    return;
  }

  drawTree(ctx, 0, -len, len*0.8, angle - 10, branchWidth*0.8);
  drawTree(ctx, 0, -len, len*0.8, angle + 10, branchWidth*0.8);

  ctx.restore();
};