#!/bin/zsh

echo "Enter filename:"
read -r filename

if [[ ! "$filename" =~ \.md$ ]]; then
    filename="$filename.md"
fi

echo "Enter title:"
read -r title

echo "Enter category:"
read -r category
category=$(echo "$category" | tr "[:upper:]" "[:lower:]")

created=$(date +"%Y/%m/%d")

template="---\ntitle: $title\ncategory: $category\ncreated: $created\ndraft: true\n---\n\nProse Body Here"
#echo "$template"

script=$(realpath "$0")
dir=$(dirname "$script")
target="$dir/../public/source/prose/$filename"

if [ -f "$target" ]; then
  echo "The file [$filename] already exists at [$target]."
else
  touch "$target"
  target=$(realpath "$target")
  echo "$template" > "$target"
  echo "New prose file [$filename] has been created at [$target]."
fi