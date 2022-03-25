<!-- ## Commands

- `mkdocs new [dir-name]` - Create a new project.
- `mkdocs serve` - Start the live-reloading docs server.
- `mkdocs build` - Build the documentation site.
- `mkdocs -h` - Print help message and exit.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files. -->

## Installation for local

    In order to run the Illustry application on localhost, the next scripts needs to be run:

    server/
    - npm i  # for the packages to be put in the node_modules file
    - npm run build # in order to transpile the typescript
    - npm run dev # to start the server (default port:7000)

    client/
    - npm i # for the packages to be put in the node_modules file
    - ng build # in order to transpile the typescript
    - ng serve # to start the server (default port:4200)

    In order to create a connection, a file named config.dev.json needs to be made with the following structure:
    {
    "mongoUrl": {name_of_connection},
    "mongoUser": {username},
    "mongoPass": {password}"
    }

## Installation with docker
    In order to run the Illustry application with docker, the next scripts needs to be run:

    - docker-compose up #make sure you have docker installed;