export const getQuery = (address: string, dataToLoad: string[]) => {
  const auction = dataToLoad.includes('auction')
    ? `nounsActiveMarket(
            where: {collectionAddress: "${address}"}
        ) {
            tokenId
            status
            endTime
            estimatedDurationTime
            highestBidder
            highestBidPrice {
                nativePrice {
                    decimal
                }
            }
            metadata
            duration
        }`
    : ''
  const governance = dataToLoad.includes('governance')
    ? `nounsProposals(
        where: {collectionAddresses: "${address}"}
        sort: {sortKey: CREATED, sortDirection: DESC}
        pagination: { limit: 20 }
        ) {
            nodes {
                proposalNumber
                proposalId
                title
                status
                voteStart
                voteEnd
                abstainVotes
                againstVotes
                forVotes
                quorumVotes
            }
        }`
    : ''

  return `
    query BuilderDAO {
      nouns {
        nounsDaos(
            where: {collectionAddresses: "${address}"}
          ) {
            nodes {
              name
            }
        }
        ${auction}
        ${governance}
      }
    }
  `
}
