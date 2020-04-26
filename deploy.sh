yarn build
cd dist
cp -rf * ~/dev/cryizzle.github.io/bread/
cd ~/dev/cryizzle.github.io/
git add -A
git commit -m "Deploy"
git push
