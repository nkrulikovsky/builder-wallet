import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { shortAddress, shortENS } from '../utils/addressAndENSDisplayUtils'
import { getQuery } from '../utils/query'
import { createPublicClient, fallback, http, isAddress } from 'viem'
import { mainnet } from 'viem/chains'

import { Proposal } from '../types/nouns'
import { loadImage } from '../data/images'

require('dotenv').config()

const ANKR_RPC_URL = process.env.ANKR_RPC_URL
const BLOCKPI_RPC_URL = process.env.BLOCKPI_RPC_URL
const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL

const url = 'https://api.zora.co/graphql'

const getData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = req.params.slug
    const dataToLoad = String(req.query.data).split(',') ?? []

    if (!address)
      return res.status(404).json({ message: 'Provide DAO address' })
    if (!isAddress(address))
      return res.status(400).json({ error: 'Incorrect DAO address' })

    const ankr = http(ANKR_RPC_URL)
    const blockpi = http(BLOCKPI_RPC_URL)
    const alchemy = http(ALCHEMY_RPC_URL)

    const client = createPublicClient({
      chain: mainnet,
      transport: fallback([ankr, blockpi, alchemy])
    })

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
        const ens = await client.getEnsName({
          address: auctionBidder
        })
        bidder = ens ? shortENS(ens) : shortAddress(auctionBidder)

        amount = auctionAmount
      }

      const pngBuffer = await loadImage(
        client,
        address,
        auctionData.tokenId,
        500
      )
      const image = pngBuffer.toString('base64')

      returnData.auction = {
        id: Number(auctionData.tokenId),
        bidder: bidder,
        amount: Number(amount),
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
    console.error(e)
    return res.status(500).json({ error: 'Error happened during data loading' })
  }
}

export default { getData }
