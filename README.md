# Mirror Prime Tree
A data visualization for a number generation algorithm.

[Live Site](https://johnschoeman.github.io/mirror-prime-tree/)


![home page]()

## Background and Overview

A mirror or palindrome prime is any prime that is also prime when written in reverse. e.g. 13 and 31.  One can generate a tree of numbers by using mirroring in a simple algorithm as follows: 

- given a natural number n (written in base 10).
- rewrite n in every base from 2 up to (n - 1).
- mirror each representation of n in it's given base.
- rewrite the mirrored number in base 10.
- any number larger than n that has not already been generated is taken as a child node of n.
- repeat the process for each child node.

An example using 11 as the parent node:

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

In the mirror prime visualizer users are able to

- [ ] create a tree based of a mirroring numbers algorithm by providing a seed number.
- [ ] adjust parameters of the number generation algorithm and generate different tree shapes: (seed, interations, number-type, child node quanity)
- [ ] adjust rendering parameters of the tree: (Size, angle, node size)
- [ ] animate the node generation process of a given tree.

### Sample Animation

![slow animation]()

## Interesting Design Choices

- generation of a tree by creation of an abstract data type.
- using depth first recursion in the generation of a single frame to keep code DRY and reduce overhead of canvas operations.
- using dynamic programing to increase speed of tree generation animation.
- defining user interface to restrict request animation frame instances to a single instance, reducing potential for application crashes.

## Architecture and Technologies

This project is built with the following technologies:

- Vanilla JavaScript (ES6)
- HTML5 Canvas
- Webpack

### Potential Future Functionality

- saving of created images to users local machine.
- saving gifs of animated trees.
- making the application mobible responsive using css-grid.
- users chosing start location of tree rendering.
- a 'fractal painter' user experience where paint brushes/stamps are generated fractals, such as binary trees, the mandlebrot set with zoom, a koch curve, choas/attractor generated sperpenski's triangle, trigonomotry based dot animation.
- drag and drop mainipulation of tree nodes.
- rendering single walks within the tree and/or highlighting those walks.
- hover/click event listeners that show the node value.
- users able to choose color of tree elements.
- color gradients based of number of prime factors of nodes.
- a tree generation based off of other algorithms, i.e. p-adic numbers.
- animation of a single rendering process.
- automated animation of other parameter deltas.
- a breadth first version of a single frame rendering.
- nodes being rendered on concentric circles based off of node depth.
- javascript classes to modularize user input elements.
- a 'danger mode' to allow users to use highly computationally demanding parameters.
- a 'party mode' that renders/animates trees at random, with flashing colors.
- apply a signleton pattern to construct a single instance of a request animation frame.