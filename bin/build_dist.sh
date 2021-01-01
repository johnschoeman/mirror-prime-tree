#!/bin/bash

if [ ! -d "./dist" ]
then
  mkdir dist
fi

cp -r ./assets ./dist/
cp -r ./doodles ./dist/
cp ./css/inputs.css ./dist/inputs.css
