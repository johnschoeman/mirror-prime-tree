#!/bin/bash

# Setup
rm -rf build
mkdir build
cp -r public/* build

# Build
npx tailwindcss -i ./src/tailwind.css -o ./build/index.css
node bin/esbuild.js

