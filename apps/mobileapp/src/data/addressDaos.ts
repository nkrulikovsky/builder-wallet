import { gql } from '@apollo/client'
import graphClient from './graphClient'
import { SearchDao } from '../store/daoSearch'
import { DAOS_FOR_ADDRESS_QUERY } from '../constants/queries'

export const loadDaosForAddresses = async (
  addresses: string[]
): Promise<null | SearchDao[]> => {
  const { data } = await graphClient.query({
    query: DAOS_FOR_ADDRESS_QUERY,
    variables: {
      where: { owner_in: addresses }
    }
  })

  if (!data || !data.daotokenOwners) {
    return null
  } else {
    return data.daotokenOwners.map((d: any) => {
      return {
        address: d.dao.tokenAddress,
        name: d.dao.name
      }
    })
  }
}
