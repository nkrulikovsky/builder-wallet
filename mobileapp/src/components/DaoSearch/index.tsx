import React, { useState } from 'react'
import { TextInput } from 'react-native'
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

  const [searchText, setSearchText] = useState('')

  const { data, loading, error } = useQuery(SEARCH_DAO_QUERY, {
    variables: { text: searchText },
    skip: !searchText,
    onCompleted: () => {
      if (data) {
        setSearchStatus(DaoSearchStatus.SUCCESS)
        setSearchResults(data.nouns.nounsSearch.nodes)
      }
    },
    onError: () => {
      setSearchStatus(DaoSearchStatus.ERROR)
      //   onResults([])
    }
  })

  const handleChangeText = (text: any) => {
    setSearchText(text)
  }

  return (
    <TextInput
      className="mt-3 bg-gray-100 px-3 h-9 rounded-lg"
      onChangeText={handleChangeText}
      value={searchText}
      placeholder="DAO name"
    />
  )
}

export default DaoSearch
