import { Proposal } from './types'

// Filters proposals by ACTIVE, PENDING, or QUEUED
// and sorts them by their submission date
export const filterAndSortProposals = (proposals: Proposal[]) => {
  const props = proposals.filter(
    (p: any) =>
      p.status === 'ACTIVE' || p.status === 'PENDING' || p.status === 'QUEUED'
  )

  props &&
    props.sort((a, b) => {
      const statusOrder = ['ACTIVE', 'PENDING', 'QUEUED']

      // Compare the status order
      const statusComparison =
        statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)

      if (statusComparison === 0) {
        // Same status, perform additional sorting
        if (a.status === 'ACTIVE') {
          return a.voteEnd - b.voteEnd
        } else if (a.status === 'PENDING') {
          return a.voteStart - b.voteStart
        } else if (
          a.status === 'QUEUED' &&
          a.executableFrom &&
          b.executableFrom
        ) {
          return a.executableFrom - b.executableFrom
        }
      }

      return statusComparison
    })

  return props
}

// TODO: refactor
export const getProposalStatus = (proposal: Proposal) => {
  const currentTime = Math.floor(Date.now() / 1000)

  if (proposal.voteStart > currentTime) {
    return 'PENDING'
  } else if (
    proposal.voteStart <= currentTime &&
    proposal.voteEnd > currentTime
  ) {
    return 'ACTIVE'
  } else if (
    proposal.voteEnd <= currentTime &&
    proposal.executableFrom &&
    proposal.executableFrom > currentTime
  ) {
    return 'QUEUED'
  } else if (proposal.executed) {
    return 'EXECUTED'
  } else if (proposal.canceled) {
    return 'CANCELED'
  } else if (
    proposal.executableFrom &&
    proposal.expiresAt &&
    proposal.executableFrom <= currentTime &&
    proposal.expiresAt > currentTime &&
    !proposal.executed
  ) {
    return 'EXPIRED'
  } else if (proposal.expiresAt && proposal.expiresAt <= currentTime) {
    return 'DEFEATED'
  } else {
    return 'UNKNOWN'
  }
}
