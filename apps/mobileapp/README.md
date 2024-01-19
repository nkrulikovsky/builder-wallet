# Builder Mobile App

Cross-Platform Framework used: `React-Native`

Currently supported platforms: `iOS`

## Getting started

To build the project on iOS:

1.Make sure you have Xcode and simulator installed

3.Install CocoaPods dependencies

```shell
cd ios/
pod install
```

4.Start app on simulator:

```shell
pnpm start
```

After Metro is loaded, you can start the app with `i`

## Environment variables

Mobile app uses several third party api keys that you need to run the app:

- [ankr](https://www.ankr.com/) as the main rpc node provider
- [blockpi](https://blockpi.io/) as a backup rpc node provider
- [alchemy](https://www.alchemy.com/) as a backup rpc node provider
- [posthog](https://posthog.com/) analytics service

Create `.env` file and add environment variables there:

```
ANKR_RPC_URL=https://rpc.ankr.com/eth/...
BLOCKPI_RPC_URL=https://ethereum.blockpi.network/v1/rpc/...
ALCHEMY_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/...
POSTHOG_TOKEN=phc_...
```

You can check `.env.example` file for a usage example.

> You need to provide the full link of the rpc provider, not just API key.

Above rpc providers have been chosen, as they provide highest response speed. And Alchemy is just reliable. It is possible to use other providers, just use their URL links. Also, you can use only one rpc node locally to ease the development.

## Publishing in store

Please follow [official guide](https://reactnative.dev/docs/publishing-to-app-store) on how to publish app in the App Store.
