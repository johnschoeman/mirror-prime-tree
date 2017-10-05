import { generateTree } from './mirror_prime_generator';
import { drawMirrorTree } from './mirror_tree';

let animationId;

export const initTreeAnimation = function initTreeAnimation(ctx, drawOptions, treeOptions, animateOptions, canvas) {
  
  animationId = window.requestAnimationFrame(animateMirrorTree(ctx, drawOptions, treeOptions, animateOptions, canvas));

  // let startButton = document.getElementById('start-animation');
  let stopButton = document.getElementById('stop-animation');

  stopButton.addEventListener("click", () => {
    console.log('clicked stop');
    window.cancelAnimationFrame(animationId);
  });
  // startButton.addEventListener("click", () => {
  //   console.log('clicked start');
  //   ctx.clearRect(0,0,canvas.width,canvas.height);
  //   animationId = window.requestAnimationFrame(animateMirrorTree(ctx, drawOptions, treeOptions, animateOptions, canvas))
  // });
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