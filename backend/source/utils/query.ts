export const getQuery = (
  address: string,
  dataToLoad: string[],
  currentTime: number
) => {
  const auction = dataToLoad.includes('auction')
    ? `auctions(
        where: {
          dao: "${address}",
          settled: false
        }
      ) {
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
      auctionConfig(id: "${address}") {
        duration
      }`
    : ''
  // TODO: remove voteEnd_gte to also load Queued proposals
  const governance = dataToLoad.includes('governance')
    ? `proposals(
        orderBy: proposalNumber
        where: {
          dao: "${address}",
          voteEnd_gte: "${currentTime}",
          executed: false,
          canceled: false,
        }
        orderDirection: desc,
        first: 10
      ) {
        abstainVotes
        queued
        againstVotes
        executed
        executableFrom
        expiresAt
        forVotes
        proposalId
        proposalNumber
        quorumVotes
        title
        vetoed
        voteEnd
        voteStart
      }`
    : ''

  return `
    query BuilderDAO {
      dao(id: "${address}") {
        name
      },
      ${auction}
      ${governance}
    }
  `
}
