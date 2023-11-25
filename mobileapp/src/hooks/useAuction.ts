import { ApolloError, useQuery } from '@apollo/client'
import { DAO_QUERY } from '../constants/queries'
import { BuilderDAOsAuctionResponse, CurrentAuction } from '../utils/types'

export default function useAuction(dao: string) {
  const {
    loading,
    error,
    data
  }: {
    loading: boolean
    error?: ApolloError
    data?: BuilderDAOsAuctionResponse
  } = useQuery(DAO_QUERY, {
    variables: {
      dao: dao
    },
    pollInterval: 900000
  })

  const auction: CurrentAuction | undefined =
    data?.auctions && data?.auctions[0]

  if (auction) {
    auction.endTime = auction.endTime * 1000
  }

  return { auction, loading, error }
}
