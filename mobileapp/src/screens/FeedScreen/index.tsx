import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { HomeTabScreenProps } from '../../navigation/types'
import { useReducer } from 'react'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Proposal } from '../../utils/types'
import ProposalCard from '../../components/ProposalCard'

const PROPS_QUERY = gql`
  query BuilderDAOsProps($addresses: [String!], $limit: Int!) {
    nouns {
      nounsProposals(
        where: { collectionAddresses: $addresses }
        sort: { sortKey: CREATED, sortDirection: DESC }
        pagination: { limit: $limit }
      ) {
        nodes {
          collectionAddress
          proposalNumber
          proposalId
          title
          status
          voteStart
          voteEnd
          executableFrom
          expiresAt
          abstainVotes
          againstVotes
          forVotes
          quorumVotes
        }
      }
    }
  }
`

const FeedScreen = ({ route, navigation }: HomeTabScreenProps<'Feed'>) => {
  const insets = useSafeAreaInsets()

  const savedDaos = useDaosStore(state => state.saved)

  const [refreshing, setRefreshing] = React.useState(false)
  const [reloadKey, reloadData] = useReducer(x => x + 1, 0)

  const { loading, error, data, refetch } = useQuery(PROPS_QUERY, {
    variables: {
      addresses: savedDaos.map(dao => dao.address),
      limit: 10 * savedDaos.length
    },
    pollInterval: 600000
  })

  const onRefresh = React.useCallback(() => {
    refetch()
    setRefreshing(true)
    reloadData()
    const reloadTime = savedDaos.length > 0 ? 1420 : 400
    setTimeout(() => {
      setRefreshing(false)
    }, reloadTime)
  }, [savedDaos])

  const props: Proposal[] = data?.nouns.nounsProposals.nodes.filter(
    (p: any) =>
      p.status === 'ACTIVE' || p.status === 'PENDING' || p.status === 'QUEUED'
  )

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

  return (
    <ScrollView
      className="flex flex-col h-full bg-white"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          colors={['#CCCCCC']}
          tintColor={'#CCCCCC'}
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={insets.top}
        />
      }>
      <SafeAreaView>
        <View className="mx-4 mt-6 flex flex-col h-full">
          <View className="mb-3 flex flex-row items-center justify-between">
            <Text className="text-4xl font-extrabold">Feed</Text>
          </View>
          {loading ? (
            <ActivityIndicator
              className="mx-auto mt-[80%]"
              size="small"
              color="#9D9D9D"
            />
          ) : error ? (
            <View className="mx-auto mt-[80%] max-w-[160px] text-center">
              <Text className="max-w-[160px] text-center text-red">
                Couldn't load proposals
              </Text>
            </View>
          ) : data && props.length > 0 ? (
            <FlatList
              data={props}
              renderItem={({ item, index }) => (
                <ProposalCard
                  proposal={item}
                  dao={
                    savedDaos.find(
                      dao => dao.address === item.collectionAddress
                    )!
                  }
                  key={`${index}-${item.proposalId}-${reloadKey}`}
                />
              )}
              keyExtractor={item => item.proposalId}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <View className="mx-auto mt-[80%] max-w-[160px] text-center">
              <Text className="max-w-[160px] text-center">
                No active or pending proposals!
              </Text>
              <Text className="mt-2 text-center">⌐◨-◨</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default FeedScreen
