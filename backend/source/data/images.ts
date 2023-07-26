import axios from 'axios'
import sharp from 'sharp'
import { PublicClient, encodeFunctionData, decodeFunctionResult } from 'viem'
import NounsTokenAbi from '../abis/NounsToken.json'
import { base64ToObject, extractBase64FromDataUrl } from '../utils/types'
import config from '../config'

// const { addresses } = config

export const loadImage = async (
  client: PublicClient,
  address: `0x${string}`,
  token: number | string,
  size: number
): Promise<Buffer> => {
  let image

  // if (
  //   isAddressEqual(address, addresses.lilNounsToken) ||
  //   isAddressEqual(address, addresses.nounsToken)
  // ) {
  //   const tokenContract = {
  //     address: address,
  //     abi: NounsTokenAbi as Abi
  //   } as const

  //   const results = await client.multicall({
  //     contracts: [
  //       {
  //         ...tokenContract,
  //         functionName: 'seeds',
  //         args: [token]
  //       },
  //       {
  //         ...tokenContract,
  //         functionName: 'descriptor'
  //       }
  //     ]
  //   })

  //   const seeds = results[0].result
  //   const descriptor = results[1].result as `0x${string}`

  //   // console.log(token)
  //   // console.log(seeds)
  //   // console.log(descriptor)

  //   const svg = await client.readContract({
  //     address: descriptor,
  //     abi: NounsDescriptorAbi,
  //     functionName: 'generateSVGImage',
  //     args: [seeds]
  //   })

  //   const svgBuffer = Buffer.from(String(svg), 'base64')

  //   image = svgBuffer
  // } else {
  // const tokenUri = await client.readContract({
  //   address: address,
  //   abi: MetadataRendererAbi,
  //   functionName: 'tokenURI',
  //   args: [token]
  // })

  const data = encodeFunctionData({
    abi: NounsTokenAbi,
    functionName: 'tokenURI',
    args: [token]
  })

  const tokenData = await client.call({
    to: address,
    data: data,
    gas: 500_000_000n
  })

  if (!tokenData.data) {
    throw new Error('Error calling the contract.')
  }

  const tokenUri = decodeFunctionResult({
    abi: NounsTokenAbi,
    functionName: 'tokenURI',
    data: tokenData.data
  })

  const tokenUriObj = base64ToObject(extractBase64FromDataUrl(String(tokenUri)))

  const imageUrl = tokenUriObj.image
  const imageData = await axios.get(imageUrl, {
    responseType: 'arraybuffer'
  })

  image = imageData.data
  // }

  const pngBuffer = await sharp(image).resize(size).png().toBuffer()

  return pngBuffer
}
