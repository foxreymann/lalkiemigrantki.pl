cd=`dirname $PWD |sed 's/\//\\\\\//g'`;
DIR=`echo /assets/images/shows$PWD | sed "s/$cd//"`

for i in *.jpg
do
echo ![]\($DIR/$i\)
done
