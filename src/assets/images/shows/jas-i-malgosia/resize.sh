for i in *.jpg
do
convert -strip -resize 800x -quality 85% "$i" "$i".800x.jpg
done
find ./ -type f -size +1M -exec rm {} \;
