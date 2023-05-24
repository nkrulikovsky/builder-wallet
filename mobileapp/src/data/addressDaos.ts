import { gql } from '@apollo/client'
import zoraClient from './zoraClient'
import { SearchDao } from '../store/daoSearch'

const DAOS_QUERY = gql`
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

export const loadDaosForAddresses = async (
  addresses: string[]
): Promise<null | SearchDao[]> => {
  const { data } = await zoraClient.query({
    query: DAOS_QUERY,
    variables: {
      addresses
    }
  })

  if (!data || !data.nouns || !data.nouns.nounsDaos) {
    return null
  } else {
    return data.nouns.nounsDaos.nodes.map((dao: any) => {
      return {
        address: dao.collectionAddress,
        name: dao.name
      }
    })
  }
}
