import { ApolloError, useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'react-native-svg'
import { BuilderDAOsPropsResponse, DAO } from '../../utils/types'
import { PROPS_QUERY } from '../../constants/queries'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { filterAndSortProposals } from '../../utils/proposals'
import ProposalCard from '../ProposalCard'
import Section from '../Section'
import { manualDaos } from '../../constants/manualDaos'
import { isAddressEqual } from 'viem'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

type ProposalsSectionProps = {
  dao: DAO
  className?: string
}

const ProposalsSection = ({ dao, className }: ProposalsSectionProps) => {
  const navigation = useNavigation()

  // TODO: show proposals from manualDaos
  const nouns = manualDaos.find(d =>
    isAddressEqual(
      d.collectionAddress as `0x${string}`,
      dao.address as `0x${string}`
    )
  )

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
    skip: nouns !== undefined,
    variables: {
      addresses: [dao.address],
      limit: 20
    },
    pollInterval: 600000
  })

  const viewAllProposals = () => {
    navigation.navigate('Proposals', { dao })
  }

  const props = data?.nouns.nounsProposals.nodes
  const proposals = props && filterAndSortProposals(props)

  return (
    <Section title="Proposals" className={className}>
      <View className="flex flex-col gap-3">
        {nouns ? (
          <View className="border border-grey-one rounded-lg p-4">
            <Text className="text-grey-four">
              Proposals are currently not supported in app
            </Text>
          </View>
        ) : loading ? (
          <View className="h-12 bg-grey-one/30 rounded-lg">
            <ShimmerPlaceHolder
              duration={2500}
              width={400}
              style={{
                borderRadius: 8,
                width: '100%',
                height: '100%'
              }}
              shimmerWidthPercent={0.5}
              shimmerColors={[
                `rgba(242, 242, 242, 0.5)`,
                `rgba(231, 231, 231, 0.5)`,
                `rgba(242, 242, 242, 0.5)`
              ]}
            />
          </View>
        ) : error ? (
          <View className="border border-grey-one rounded-lg p-4">
            <Text className="text-red">Couldn't load proposals</Text>
          </View>
        ) : data && proposals && proposals.length > 0 ? (
          <FlatList
            data={proposals}
            renderItem={({ item, index }) => (
              <ProposalCard
                proposal={item}
                dao={dao}
                topCorner="proposalNumber"
                key={`${index}-${item.proposalId}`}
              />
            )}
            keyExtractor={item => item.proposalId}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            className="-mb-3"
          />
        ) : (
          <View className="border border-grey-one rounded-lg p-4">
            <Text>No active or pending proposals ⌐◨-◨</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={viewAllProposals}
          className="mt-4">
          <View className="bg-grey-one border border-grey-one h-12 w-full rounded-lg items-center justify-center">
            <Text className="text-black">View all proposals in browser</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Section>
  )
}

export default ProposalsSection
