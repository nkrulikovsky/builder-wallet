import { Request, Response, NextFunction } from 'express'
import { createPublicClient, fallback, http, isAddress } from 'viem'
import { mainnet } from 'viem/chains'
import { loadImage } from '../data/images'

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

    const size = type && type === 'thumbnail' ? 250 : 1500
    const image = await loadImage(client, address, tokenId, size)

    res.setHeader('Content-Type', 'image/png')
    return res.status(200).send(image)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Error happened during data loading' })
  }
}

export default { getData }
