import React, { useState } from 'react'
import { ActivityIndicator, TextInput, View, Text } from 'react-native'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { DaoSearchStatus, useDaoSearchStore } from '../../store/daoSearch'

const SEARCH_DAO_QUERY = gql`
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

const DaoSearch = () => {
  const setSearchStatus = useDaoSearchStore(state => state.setSearchStatus)
  const setSearchResults = useDaoSearchStore(state => state.setSearchResults)
  const clearSearchResults = useDaoSearchStore(
    state => state.clearSearchResults
  )

  const [searchText, setSearchText] = useState('')

  const { data, loading, error } = useQuery(SEARCH_DAO_QUERY, {
    variables: { text: searchText },
    skip: !searchText,
    onCompleted: () => {
      if (data) {
        setSearchStatus(DaoSearchStatus.SUCCESS)
        const daos = data.nouns.nounsSearch.nodes.map((dao: any) => ({
          name: dao.name,
          address: dao.collectionAddress
        }))
        setSearchResults(daos)
      }
    },
    onError: () => {
      setSearchStatus(DaoSearchStatus.ERROR)
    }
  })

  const handleChangeText = (text: any) => {
    setSearchText(text)

    if (text.length === 0) clearSearchResults()
  }

  return (
    <View className="mt-3 justify-center">
      <TextInput
        className="bg-grey-one px-3 h-9 rounded-lg"
        onChangeText={handleChangeText}
        value={searchText}
        placeholder="DAO name"
      />
      {loading && (
        <ActivityIndicator
          className="absolute top-2 right-2"
          size="small"
          color="#9D9D9D"
        />
      )}
      {error && (
        <Text className="mt-1 text-red">
          Error happened during loading. Try again later.
        </Text>
      )}
    </View>
  )
}

export default DaoSearch
