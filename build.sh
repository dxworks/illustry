#cd client
#npm run build
#cd ..
#rm -rf server/src/static
#cp -R client/dist/client server/src/static

cd documentation
mkdocs build
cd ..
rm -rf server/src/docs
cp -R documentation/site server/src/docs

cd server
npm run build