import { SEARCH_DAO_QUERY } from '../constants/queries'
import { ApolloError, useQuery } from '@apollo/client'
import { DaoSearchPropsResponse } from '../utils/types'

export default function useDaoSearch(
  searchText: string,
  onCompleted: (data: any) => void,
  onError: (error: any) => void
) {
  let where

  if (searchText.includes('0x') && searchText.length >= 6) {
    where = {
      tokenAddress_contains: searchText
    }
  } else {
    where = {
      name_contains_nocase: searchText
    }
  }

  const {
    loading,
    error,
    data
  }: {
    loading: boolean
    error?: ApolloError
    data?: DaoSearchPropsResponse
  } = useQuery(SEARCH_DAO_QUERY, {
    variables: { where: where, first: 100 },
    skip: !searchText,
    onCompleted: onCompleted,
    onError: onError
  })

  return { data, loading, error }
}
