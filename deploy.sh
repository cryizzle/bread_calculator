yarn build
cd dist
git init
git add -A
git commit -m "Deploy"
git push -f https://github.com/cryizzle/bread_calculator.git master:gh-pages
