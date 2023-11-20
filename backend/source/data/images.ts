import axios from 'axios'
import sharp from 'sharp'
import { PublicClient, encodeFunctionData, decodeFunctionResult } from 'viem'
import NounsTokenAbi from '../abis/NounsToken.json'
import { base64ToObject, extractBase64FromDataUrl } from '../utils/types'

export const loadImage = async (
  client: PublicClient,
  address: `0x${string}`,
  token: number | string,
  size: number
): Promise<Buffer> => {
  let image

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

  const pngBuffer = await sharp(image).resize(size).png().toBuffer()

  return pngBuffer
}

export const loadImageFromUrl = async (url: string, size: number) => {
  const imageData = await axios.get(url, {
    responseType: 'arraybuffer'
  })

  const image = imageData.data

  const pngBuffer = await sharp(image).resize(size).png().toBuffer()

  return pngBuffer
}
