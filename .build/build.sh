#!/bin/bash

echo "COPING FILES ..."
cd ../
for directory in *
do
  if [ $directory != "react" ]
  then
    echo $directory
    cp -r $directory .build/package
  fi
done
mkdir .build/package/react/
cp -r react/build/ .build/package/react/build/
cd .build
echo "REMOVING UNNECESSARY FILES ..."

paths_to_exclude="items-to-exclude.ini"
while IFS= read -r line
do
  rm -r "package/$line"
done < "$paths_to_exclude"

echo "COPYING CONFIG FILES ..."

paths_to_include="items-to-copy.ini"
while IFS= read -r file
do
  read -r destination
  cp "template/$file" "package/$destination"
done < "$paths_to_include"

echo "ZIPPING PACKAGE"
zip -rv package.zip package/
echo "CLEARING FOLDERS"
rm -r package/*
