import { gql } from '@apollo/client'

export const PROPS_QUERY = gql`
  query BuilderDAOsProps($where: Proposal_filter, $first: Int!) {
    proposals(
      where: $where
      first: $first
      orderBy: timeCreated
      orderDirection: desc
    ) {
      proposalNumber
      proposalId
      title
      voteStart
      voteEnd
      executableFrom
      expiresAt
      executed
      canceled
      abstainVotes
      againstVotes
      forVotes
      quorumVotes
      dao {
        tokenAddress
      }
      votes {
        voter
        support
      }
    }
  }
`

export const DAO_QUERY = gql`
  query BuilderDAO($dao: String!) {
    auctions(where: { dao: $dao, settled: false }) {
      token {
        name
        image
        tokenId
      }
      endTime
      highestBid {
        id
        amount
        bidder
      }
    }
    auctionConfig(id: $dao) {
      duration
    }
  }
`

// TODO: update this query to use the new DAOs endpoint
export const IMAGE_QUERY = gql`
  query Image($address: String!, $tokenId: String!) {
    token(token: { address: $address, tokenId: $tokenId }) {
      token {
        image {
          url
          mimeType
          mediaEncoding {
            ... on ImageEncodingTypes {
              original
              thumbnail
            }
            ... on UnsupportedEncodingTypes {
              __typename
              original
            }
          }
        }
      }
    }
  }
`

// TODO: update this query to use the new DAOs endpoint
export const SEARCH_DAO_QUERY = gql`
  query SearchDAO($text: String!) {
    nouns {
      nounsSearch(query: { text: $text }, pagination: { limit: 50 }) {
        nodes {
          name
          collectionAddress
        }
        pageInfo {
          limit
          endCursor
          hasNextPage
        }
      }
    }
  }
`

// TODO: update this query to use the new DAOs endpoint
export const DAOS_FOR_ADDRESS_QUERY = gql`
  query DAOsForAddresses($addresses: [String!]) {
    nouns {
      nounsDaos(where: { memberAddresses: $addresses }) {
        nodes {
          name
          collectionAddress
        }
      }
    }
  }
`
