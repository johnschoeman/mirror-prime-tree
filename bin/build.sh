#!/bin/bash

# Setup
rm -rf build
mkdir build
cp -r public/* build

cp -r src/markup build/doodles

# Build
node bin/esbuild.js


