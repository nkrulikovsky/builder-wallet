# Builder Mobile App Back-end

Node Express API back-end. Used to:

1. Transform Dao images into PNG format, as some SVG images are not well supported on native platforms, due to the lack of browser native apis.
2. Aggregate Dao data for usage in widgets, as Node provides better tooling to load on-chain data than native platforms.

## Getting started

To build the project on iOS:

1. Add the required [environment variables](#environment-variables)

2. Run server locally:

```shell
pnpm dev
```

## Environment variables

Mobile app uses several third party api keys that you need to run the app:

- [ankr](https://www.ankr.com/) as the main rpc node provider
- [blockpi](https://blockpi.io/) as a backup rpc node provider
- [alchemy](https://www.alchemy.com/) as a backup rpc node provider

Create `.env` file and add environment variables there:

```
ANKR_RPC_URL=https://rpc.ankr.com/eth/...
BLOCKPI_RPC_URL=https://ethereum.blockpi.network/v1/rpc/...
ALCHEMY_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/...
```

You can check `.env.example` file for a usage example.

> You need to provide the full link of the rpc provider, not just API key.

Above rpc providers have been chosen, as they provide highest response speed. And Alchemy is just reliable. It is possible to use other providers, just use their URL links. Also, you can use only one rpc node locally to ease the development.

## Deploying

1. Make sure to have the required [environment variables](#environment-variables) for deployment

2. Specify the build command:

```
pnpm build
```

3. Specify start command:

```
pnpm start
```

4. Set the domain name for the api server.

5. Make sure mobile app uses newly deployed api url.
