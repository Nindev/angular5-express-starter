# angular5-express-starter

Angular 5 client + Express server + MongoDB

## Installation

1. Clone this repo `git clone https://github.com/lula/angular5-express-starter.git && cd angular5-express-starter`
2. Clean and init git `sudo rm -r .git && git init`
3. Install dependencies `npm install`

## Development

`npm run start:dev`: start dev server and client with livereload

In development the client is not served by Express, but by angular cli!

## Production

`npm run build`: build and package client and server for production (aot)

`npm run start:prod`: start server and client in a production env defined in package.json (for testing purposes).