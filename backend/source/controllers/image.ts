import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import sharp from 'sharp'
import { createPublicClient, http, isAddress } from 'viem'

import MetadataRendererAbi from '../abis/MetadataRenderer.json'
import { base64ToObject, extractBase64FromDataUrl } from '../utils/types'
import { AlchemyProvider, Contract } from 'ethers'

require('dotenv').config()

const ALCHEMY_KEY = process.env.ALCHEMY_KEY

const url = 'https://api.zora.co/graphql'

const getData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = req.params.address
    const tokenId = req.params.id

    if (!address)
      return res.status(404).json({ message: 'Provide DAO address' })
    if (!tokenId) return res.status(404).json({ message: 'Provide token id' })
    if (!isAddress(address))
      return res.status(400).json({ error: 'Incorrect DAO address' })

    const provider = new AlchemyProvider('mainnet', ALCHEMY_KEY) // TODO: Use custom key for nounish widgets
    // const client = createPublicClient({
    //   chain: mainnet,
    //   transport: http()
    // })

    const contract = new Contract(address, MetadataRendererAbi, provider)
    const tokenUri = await contract.tokenURI(tokenId)

    const tokenUriObj = base64ToObject(
      extractBase64FromDataUrl(String(tokenUri))
    )

    const imageUrl = tokenUriObj.image
    const imageData = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    })
    const pngBuffer = await sharp(imageData.data).resize(1500).png().toBuffer()
    const image = pngBuffer.toString('base64')

    return res.status(200).json(`data:image/png;base64,${image}`)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Error happened during data loading' })
  }
}

export default { getData }
