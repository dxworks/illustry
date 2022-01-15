# Illustry

Welcome to Illustry, a visualisation tool to analyse software systems, and much more.

### Build and Deploy

To build for production, run `docker build -t dxworks/illustry .` in the root folder. 

To test that your build works properly, run `docker-compose up -d` and visit `http://localhost:7001` or `https://illustry.localhost` if you have traefik set up.

To deploy the new image, tag the image and push it:

```shell
docker build -t dxworks/illustry:<version> --label "version=<version>" --label "releaseDate=2022-01-15" .
docker push dxworks/illustry:<version>
```

To also push the latest version, please do:

```shell
docker tag dxworks/illustry:latest dxworks/illustry:<version>
docker push dxworks/illustry:latest
```

