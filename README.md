# Illustry

Welcome to Illustry, a visualisation tool to analyse software systems, and much more.

### Build and Deploy

To build for production, run `docker build -t dxworks/illustry .` in the root folder. 

To test that your build works properly, run `docker-compose up -d` and visit `http://localhost:7001` or `https://illustry.localhost` if you have traefik set up.

To deploy the new image, tag the image and push it:
`docker build -t dxworks/illustry:<version> .`
`docker push dxworks/illustry:<version>`

