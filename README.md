# Mirror Prime Tree
A data visualization for a number generation algorithm.

## Background and Overview

A mirror or palindrome prime is any prime that is also prime when written in reverse. e.g. 13 and 31.  One can generate a tree of numbers by using mirroring in a simple algorithm: 

- given a natural number n (written in base 10).
- rewrite n in every base from 2 up to (n - 1).
- mirror each representation of n in it's given base.
- rewrite to mirrored number in base 10.
- any number larger than n that has not already been generated is taken as a child node of n.
- repeat the process for each child node.

An example with 11:

| base | rewritten number | mirrored number | rewritten in base 10 |
|------|------------------|-----------------|----------------------|
| 2 | 1011 | 1101 | 13 |
| 3 | 102 | 201 | 19 |
| 4 | 23 | 32 | 14 |
| 5 | 21 | 12 | 7 |
| 6 | 15 | 51 | 31 |
| 7 | 14 | 41 | 29 |
| 8 | 13 | 31 | 25 |
| 9 | 12 | 21 | 19 |
| 10 | 11 | 11 | 11 |

The children of 11 would then be taken as:
```
[13, 19, 14, 31, 29, 25, 19]
```
## Functionality & MVP

In the mirror prime visualizer users will be able to

- [ ] create a tree based of a mirroring numbers algorithm by providing a seed number.
- [ ] adjust parameters (spacing, ordering, duplication, etc.) of the number generation algorithm and generate different tree shapes
- [ ] adjust color parameters of the tree, with an option to see iteration walks highlighted.
- [ ] zoom in on nodes and display node information.
- [ ] drag and drop nodes of the tree

## Wireframes

![wireframe](https://github.com/johnschoeman/mirror-prime-tree/blob/master/docs/Web%201920%20%E2%80%93%201.png)

## Architecture and Technologies

This project will be implemented with the following technologies:

- vanilla javascript
- HTML5 canvas
- Webpack

## Implementation Timeline

**Over the weekend**
- [x] Finsh tree node data strucure and node generation algorithm.
- [x] Set up weback and basic HTML 5 canvas rendering.
- [x] Learn how to procedurally generate trees using canvas.

**Day 1:** Finish node generation implementation and render basic tree nodes

**Day 2:** Color nodes based off user input.

**Day 3:** Allow users to drag and drop nodes.

**Day 4:** Animate generation of tree.