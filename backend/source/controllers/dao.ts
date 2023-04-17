import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { shortAddress, shortENS } from '../utils/addressAndENSDisplayUtils'
import sharp from 'sharp'
import { getQuery } from '../utils/query'
import { createPublicClient, http, isAddress } from 'viem'
import { mainnet } from 'viem/chains'

import MetadataRendererAbi from '../abis/MetadataRenderer.json'
import { base64ToObject, extractBase64FromDataUrl } from '../utils/types'

const url = 'https://api.zora.co/graphql'

const getData = async (req: Request, res: Response, next: NextFunction) => {
  // try {
  const address = req.params.slug
  const dataToLoad = String(req.query.data).split(',') ?? []

  if (!address) return res.status(404).json({ message: 'Provide DAO address' })
  if (!isAddress(address))
    return res.status(400).json({ error: 'Incorrect DAO address' })

  const query = getQuery(address, dataToLoad)

  let result: AxiosResponse = await axios.post(url, {
    query: query
  })
  const data = result.data.data

  const auctionData = data.nouns.nounsActiveMarket
  const governanceData = data.nouns.nounsProposals.nodes

  const client = createPublicClient({
    chain: mainnet,
    transport: http()
  })

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

  const tokenUri = await client.readContract({
    address: auctionData.metadata,
    abi: MetadataRendererAbi,
    functionName: 'tokenURI',
    args: [auctionData.tokenId]
  })
  const tokenUriObj = base64ToObject(extractBase64FromDataUrl(String(tokenUri)))

  const imageUrl = tokenUriObj.image
  const imageData = await axios.get(imageUrl, {
    responseType: 'arraybuffer'
  })
  const pngBuffer = await sharp(imageData.data).resize(500).png().toBuffer()
  const image = pngBuffer.toString('base64')

  // const blockNumber = await provider.getBlockNumber()

  // const proposals = Array<Proposal>()

  // for (const prop of data.proposals) {
  //   const state = getProposalState(blockNumber, prop)

  //   if (state) {
  //     // console.log(prop)

  //     let propToAdd: Proposal = {
  //       id: Number(prop.id),
  //       title: prop.title,
  //       state: state,
  //       endTime: getProposalEndTimestamp(blockNumber, state, prop),
  //       quorum: prop.quorumVotes
  //     }

  //     if (state === 'ACTIVE') {
  //       propToAdd.votes = {
  //         yes: prop.forVotes,
  //         no: prop.againstVotes,
  //         abstain: prop.abstainVotes
  //       }
  //     }

  //     proposals.push(propToAdd)
  //   }
  // }

  let returnData = {
    auction: {
      // id: parseInt(data.auctions[0].id),
      // currentBid: ethers.utils.formatEther(amount),
      // bidder: bidder,
      // endTime: parseInt(data.auctions[0].endTime) * 1000,
      image: image
      // seed: data.auctions[0].noun.seed
    }
    // proposals: proposals
  }
  return res.status(200).json(returnData)

  return res.status(200).json('no error')
  // }
  // catch (e) {
  //   return res.status(500).json({ error: 'Error happened during data loading' })
  // }
}

export default { getData }
