yarn build
cd dist
rm -rf  ~/dev/cryizzle.github.io/bread/js
rm -rf  ~/dev/cryizzle.github.io/bread/css
cp -rf * ~/dev/cryizzle.github.io/bread/
cd ~/dev/cryizzle.github.io/
git add -A
git commit -m "Deploy"
git push
