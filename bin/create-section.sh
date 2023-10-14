#!/bin/bash

while test $# -gt 0; do
  case "$1" in
    -h|--help)
      echo "Template Components"
      echo " "
      echo "create-name [options] [arguments]"
      echo " "
      echo "arguments:"
      echo "section name"
      echo " "
      echo "options:"
      echo "-h, --help                show brief help"
      exit 0
      ;;
    *)
      break
      ;;
  esac
done

if [ $# -eq 0 ]
  then
    echo "No section name supplied"
    exit 2
fi

cp src/Templates/Section.html src/Sections/"$1".html
