import axios from 'axios'
import sharp from 'sharp'
import { Abi, PublicClient, isAddressEqual } from 'viem'
import MetadataRendererAbi from '../abis/MetadataRenderer.json'
import NounsTokenAbi from '../abis/NounsToken.json'
import NounsDescriptorAbi from '../abis/NounsDescriptor.json'
import { base64ToObject, extractBase64FromDataUrl } from '../utils/types'
import config from '../config'

const { addresses } = config

export const loadImage = async (
  client: PublicClient,
  address: `0x${string}`,
  token: number | string,
  size: number
): Promise<Buffer> => {
  let image

  if (
    isAddressEqual(address, addresses.lilNounsToken) ||
    isAddressEqual(address, addresses.nounsToken)
  ) {
    const tokenContract = {
      address: address,
      abi: NounsTokenAbi as Abi
    } as const

    const results = await client.multicall({
      contracts: [
        {
          ...tokenContract,
          functionName: 'seeds',
          args: [token]
        },
        {
          ...tokenContract,
          functionName: 'descriptor'
        }
      ]
    })

    const seeds = results[0].result
    const descriptor = results[1].result as `0x${string}`

    console.log(token)
    console.log(seeds)
    console.log(descriptor)

    const svg = await client.readContract({
      address: descriptor,
      abi: NounsDescriptorAbi,
      functionName: 'generateSVGImage',
      args: [seeds]
    })

    const svgBuffer = Buffer.from(String(svg), 'base64')

    image = svgBuffer
  } else {
    const tokenUri = await client.readContract({
      address: address,
      abi: MetadataRendererAbi,
      functionName: 'tokenURI',
      args: [token]
    })

    const tokenUriObj = base64ToObject(
      extractBase64FromDataUrl(String(tokenUri))
    )

    const imageUrl = tokenUriObj.image
    const imageData = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    })

    image = imageData.data
  }

  const pngBuffer = await sharp(image).resize(size).png().toBuffer()

  return pngBuffer
}
