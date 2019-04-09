# resivip (rsvp)

This is the RSVP system for https://brianandtina.wedding.


## Usage

The simplest way to develop against this app (i.e, a front end) is to use Docker.

The repo includes a _Dockerfile_ and _docker-compose.yml_ that can build an image capable of running the server in dev mode,
along with its required Mongo server.

This should **only** be used for development; it's poorly configured for production and
all data is erased at a restart.

To start the environment in Docker, just run:

    docker-compose up

`docker-compose down` will shutdown and remove the containers. ctrl-c works as well.

The server is available at http://localhost:4000/, a GraphiQL installation is available at that address as well.

## Development and Building

This app uses `yarn` as its npm client. It includes a few _package.json_ scripts and commands.

Command|Description
-------|-----------
`yarn` | Install dependencies.
`yarn tsc` | Compile typescript files into _lib/_.
`yarn test` | Run all tests (includes code coverage).
`yarn lint` | Run tslint.
`yarn build` | Runs lint, test, and tsc. This is for building releases.
`yarn start` | Start the app without compiling typescript (for dev/testing).


## Configuration

Configuration is currently handled via environment variables. There is currently only one option.

ENV | Description | Example
----|-------------|--------
DB_URL | The MongoDB [connection URI](https://docs.mongodb.com/manual/reference/connection-string/). | `mongodb://localhost/development`
