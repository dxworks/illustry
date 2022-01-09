cd client
npm run build
cd ..
rm -rf server/src/static
cp -R client/dist/client server/src/static
cd server
npm run build