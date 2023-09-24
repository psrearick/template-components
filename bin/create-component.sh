#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "No component name supplied"
    exit 2
fi

makeJS=false

while test $# -gt 0; do
  case "$1" in
    -h|--help)
      echo "Template Components"
      echo " "
      echo "create-component [options] [arguments]"
      echo " "
      echo "arguments:"
      echo "component name"
      echo " "
      echo "options:"
      echo "-h, --help                show brief help"
      echo "-j, --js                  additionally, create a javascript for for the component"
      exit 0
      ;;
    -j|--js)
      if test $# -gt 0; then
        makeJS=true
      fi
      shift
      ;;
    *)
      break
      ;;
  esac
done

if [ $# -eq 0 ]
  then
    echo "No component name supplied"
    exit 2
fi

cp src/Templates/Component.html src/Components/"$1".html

if [ $makeJS ]
  then
    cp src/Templates/Component.js src/js/Components/"$1".js
fi
