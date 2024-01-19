import { useQuery, ApolloError } from '@apollo/client'
import { PROPS_QUERY } from '../constants/queries'
import { BuilderDAOsPropsResponse, Proposal } from '../utils/types'
import { getProposalStatus } from '../utils/proposals'

/**
 * Custom hook that retrieves non-finished proposals based on the provided saved DAOs.
 * Non-finished proposals are proposals that are either active, pending, or queued.
 * @param savedDaos - An array of saved DAOs.
 * @returns An object containing the non-finished proposals, loading state, error state, and a refetch function.
 */
export default function useNonFinishedProposals(savedDaos: string[]) {
  const {
    data,
    loading,
    error,
    refetch
  }: {
    loading: boolean
    error?: ApolloError
    data?: BuilderDAOsPropsResponse
    refetch: () => void
  } = useQuery(PROPS_QUERY, {
    variables: {
      where: {
        dao_in: [...savedDaos],
        executed: false,
        canceled: false
      },
      first: 10 * savedDaos.length
    },
    pollInterval: 600000
  })

  const proposals: Proposal[] | undefined = data?.proposals.map((prop: any) => {
    return {
      ...prop,
      status: getProposalStatus(prop)
    }
  })

  return { proposals, loading, error, refetch }
}
