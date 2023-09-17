#!/bin/bash

# Setup
rm -rf build
mkdir build
cp -r public/* build

cp -r src/markup build/doodles

# Build
echo "Building css..."
npx tailwindcss -i ./src/tailwind.css -o ./build/index.css

echo "Building js..."
node bin/esbuild.js


