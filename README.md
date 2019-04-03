# resivip (rsvp)

This is the RSVP system for https://brianandtina.wedding.


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
