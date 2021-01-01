#!/bin/bash

if [ ! -d "./dist" ]
then
  mkdir dist
fi

cp -r ./assets ./dist/assets
cp -r ./doodles ./dist/doodles

