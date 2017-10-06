import { generateTree, addOneIterationToTree } from './mirror_prime_generator';
import { drawMirrorTree } from './mirror_tree';


// let treeOptions = {
//   seed,
//   iterations,
//   maxChildNodes,
//   showPrimes,
//   showComposites
// };

// let t = generateTree(treeOptions);

// let drawOptions = {
//   length,
//   startAngle: 0,
//   angleRange: 2*Math.PI,
//   angle: 0,
//   angleSpread,
//   dotSize,
//   lengthMultiple,
//   terminalLengthMultiplier,
//   terminalAngleRange,
//   currentNode: t.nodeHash[treeOptions.seed]
// };

// let animateOptions = {
//   currentIteration: 0,
//   maxIteration: iterations
// };

let animationId;
let currentTree;

export const initTreeAnimation = function initTreeAnimation(ctx, drawOptions, treeOptions, animateOptions, canvas) {
  
  animationId = window.requestAnimationFrame(animateMirrorTree(ctx, drawOptions, treeOptions, animateOptions, canvas));

  let stopButton = document.getElementById('stop-animation');

  stopButton.addEventListener("click", () => {
    console.log('clicked stop');
    window.cancelAnimationFrame(animationId);
  });
};


function animateMirrorTree(ctx, drawOptions, treeOptions, animateOptions, canvas) {
  // console.log('in animation step');
  // console.log('current iteration: ', animateOptions.currentIteration);
  return () => {
    treeOptions.iterations = animateOptions.currentIteration;
    animateOptions.currentIteration++;
    if (animateOptions.currentIteration - 2 === parseInt(animateOptions.maxIteration)) {
      return;
    }
    ctx.clearRect(0,0, canvas.width, canvas.height);
    let t = generateTree(treeOptions);
    drawOptions.currentNode = t.nodeHash[treeOptions.seed];
    drawMirrorTree(ctx, drawOptions);
    animationId = window.requestAnimationFrame(animateMirrorTree(ctx, drawOptions, treeOptions, animateOptions, canvas), 1000/60);
  };
}