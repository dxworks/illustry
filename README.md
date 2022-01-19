# Illustry

Welcome to Illustry, a visualisation tool to analyse software systems, and much more.

### Setup Mongo
Please configure your mongo connection in a file 'server/config.dev.json', that contains the following fields:
```json
{
  "mongoUrl": "<mongo_connection_url",
  "mongoUser": "<mongo_database_user_name>",
  "mongoPass": "<mongo_database_password>",
  "mongoDbName": "<mongo_database_name_or_null>"
}
```

### Build and Deploy

To build for production, run `docker build -t dxworks/illustry .` in the root folder. 

To test that your build works properly, run `docker-compose up -d` and visit `http://localhost:7001` or `https://illustry.localhost` if you have traefik set up.

To deploy the new image, tag the image and push it:

```shell
docker build -t dxworks/illustry:0.0.1 --label "version=0.0.1" --label "releaseDate=2022-01-15" .
docker push dxworks/illustry:0.0.1
```

To also push the latest version, please do:

```shell
docker tag dxworks/illustry:latest dxworks/illustry:0.0.1
docker push dxworks/illustry:latest
```

