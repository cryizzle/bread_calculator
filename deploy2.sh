yarn build
cd dist
cp -rf * ~/dev/cryizzle.github.io/bread/
git add -A
git commit -m "Deploy"
git push
