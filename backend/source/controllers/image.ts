import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import sharp from 'sharp'
import {
  Abi,
  createPublicClient,
  fallback,
  http,
  isAddress,
  isAddressEqual
} from 'viem'
import MetadataRendererAbi from '../abis/MetadataRenderer.json'
import NounsTokenAbi from '../abis/NounsToken.json'
import NounsDescriptorAbi from '../abis/NounsDescriptor.json'
import { base64ToObject, extractBase64FromDataUrl } from '../utils/types'
import { mainnet } from 'viem/chains'
import config from '../config'

const { addresses } = config

require('dotenv').config()

const ANKR_RPC_URL = process.env.ANKR_RPC_URL
const BLOCKPI_RPC_URL = process.env.BLOCKPI_RPC_URL
const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL

const getData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = req.params.address
    const tokenId = req.params.id
    const type = req.query.type

    if (!address)
      return res.status(404).json({ message: 'Provide DAO address' })
    if (!tokenId) return res.status(404).json({ message: 'Provide token id' })
    if (!isAddress(address))
      return res.status(400).json({ error: 'Incorrect DAO address' })

    const ankr = http(ANKR_RPC_URL)
    const blockpi = http(BLOCKPI_RPC_URL)
    const alchemy = http(ALCHEMY_RPC_URL)

    const client = createPublicClient({
      chain: mainnet,
      transport: fallback([ankr, blockpi, alchemy])
    })

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
            args: [tokenId]
          },
          {
            ...tokenContract,
            functionName: 'descriptor'
          }
        ]
      })

      const seeds = results[0].result
      const descriptor = results[1].result as `0x${string}`

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
        args: [tokenId]
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

    const size = type && type === 'thumbnail' ? 250 : 1500
    const pngBuffer = await sharp(image).resize(size).png().toBuffer()

    res.setHeader('Content-Type', 'image/png')
    return res.status(200).send(pngBuffer)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Error happened during data loading' })
  }
}

export default { getData }
