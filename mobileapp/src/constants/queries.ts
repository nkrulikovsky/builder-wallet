import { gql } from '@apollo/client'

export const PROPS_QUERY = gql`
  query BuilderDAOsProps($addresses: [String!], $limit: Int!) {
    nouns {
      nounsProposals(
        where: { collectionAddresses: $addresses }
        sort: { sortKey: CREATED, sortDirection: DESC }
        pagination: { limit: $limit }
      ) {
        nodes {
          collectionAddress
          proposalNumber
          proposalId
          title
          status
          voteStart
          voteEnd
          executableFrom
          expiresAt
          abstainVotes
          againstVotes
          forVotes
          quorumVotes
          votes {
            voter
            support
          }
        }
      }
    }
  }
`

export const DAO_QUERY = gql`
  query BuilderDAOsProps($address: String!) {
    nouns {
      nounsActiveMarket(where: { collectionAddress: $address }) {
        tokenId
        endTime
        estimatedDurationTime
        highestBidPrice {
          nativePrice {
            decimal
          }
        }
        highestBidder
        address
        metadata
      }
    }
  }
`

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
