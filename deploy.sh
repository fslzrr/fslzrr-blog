echo ' '
echo ' '
echo ' '
echo '>>> Prapraring project <<<'
echo ' '
echo ' '
echo ' '
cd front
yarn install
yarn build
cd ..
cp -R front/build back
cd back
yarn install
echo ' '
echo ' '
echo ' '
echo '>>> Deploying project <<<'
echo ' '
echo ' '
echo ' '
git push heroku master