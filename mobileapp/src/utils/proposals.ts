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
