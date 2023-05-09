import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { shortAddress, shortENS } from '../utils/addressAndENSDisplayUtils'
import sharp from 'sharp'
import { getQuery } from '../utils/query'
import { createPublicClient, http, isAddress } from 'viem'
import { mainnet } from 'viem/chains'

import MetadataRendererAbi from '../abis/MetadataRenderer.json'
import { base64ToObject, extractBase64FromDataUrl } from '../utils/types'
import { Proposal } from '../types/nouns'
import { AlchemyProvider, AnkrProvider, Contract } from 'ethers'

require('dotenv').config()

const ALCHEMY_KEY = process.env.ALCHEMY_KEY

const url = 'https://api.zora.co/graphql'

const getData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = req.params.slug
    const dataToLoad = String(req.query.data).split(',') ?? []

    if (!address)
      return res.status(404).json({ message: 'Provide DAO address' })
    if (!isAddress(address))
      return res.status(400).json({ error: 'Incorrect DAO address' })

    const provider = new AlchemyProvider('mainnet', ALCHEMY_KEY) // TODO: Use custom key for nounish widgets
    // const client = createPublicClient({
    //   chain: mainnet,
    //   transport: http()
    // })

    const query = getQuery(address, dataToLoad)

    let result: AxiosResponse = await axios.post(url, {
      query: query
    })
    const data = result.data.data

    const daoData = data.nouns.nounsDaos.nodes[0]

    let returnData: { [k: string]: any } = {
      dao: {
        name: daoData.name
      }
    }

    if (dataToLoad.includes('auction')) {
      const auctionData = data.nouns.nounsActiveMarket

      let bidder = '-'
      let amount = '0'

      const auctionBidder = auctionData.highestBidder
      const auctionAmount = auctionData.highestBidPrice.nativePrice.decimal

      if (auctionBidder && auctionAmount) {
        const ens = await provider.lookupAddress(auctionBidder)
        // const ens = await client.getEnsName({
        //   address: auctionBidder
        // })
        bidder = ens ? shortENS(ens) : shortAddress(auctionBidder)

        amount = auctionAmount
      }

      // const tokenUri = await client.readContract({
      //   address: auctionData.metadata,
      //   abi: MetadataRendererAbi,
      //   functionName: 'tokenURI',
      //   args: [auctionData.tokenId]
      // })

      const contract = new Contract(
        auctionData.metadata,
        MetadataRendererAbi,
        provider
      )
      const tokenUri = await contract.tokenURI(auctionData.tokenId)

      const tokenUriObj = base64ToObject(
        extractBase64FromDataUrl(String(tokenUri))
      )

      const imageUrl = tokenUriObj.image
      const imageData = await axios.get(imageUrl, {
        responseType: 'arraybuffer'
      })
      const pngBuffer = await sharp(imageData.data).resize(500).png().toBuffer()
      const image = pngBuffer.toString('base64')

      returnData.auction = {
        id: Number(auctionData.tokenId),
        bidder: bidder,
        amount: amount,
        endTime: Number(auctionData.endTime),
        duration: Number(auctionData.duration),
        image: image
      }
    }
    if (dataToLoad.includes('governance')) {
      const governanceData = data.nouns.nounsProposals.nodes

      const proposals = Array<Proposal>()

      for (const prop of governanceData) {
        if (prop.status === 'ACTIVE' || prop.status === 'PENDING') {
          const endTime = Number(
            prop.status === 'ACTIVE' ? prop.voteEnd : prop.voteStart
          )

          let propToAdd: Proposal = {
            id: prop.proposalId,
            number: Number(prop.proposalNumber),
            title: prop.title,
            state: prop.status,
            endTime: endTime,
            quorum: prop.quorumVotes
          }

          if (prop.status === 'ACTIVE') {
            propToAdd.votes = {
              yes: prop.forVotes,
              no: prop.againstVotes,
              abstain: prop.abstainVotes
            }
          }

          proposals.push(propToAdd)
        }
      }

      returnData.governance = {
        proposals: proposals
      }
    }

    return res.status(200).json(returnData)
  } catch (e) {
    return res.status(500).json({ error: 'Error happened during data loading' })
  }
}

export default { getData }
