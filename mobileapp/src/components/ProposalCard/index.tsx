import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Proposal } from '../../utils/types'
import clsx from 'clsx'
import { SavedDao } from '../../store/daos'

type ProposalCardProps = {
  dao: SavedDao
  proposal: Proposal
}

const ProposalCard = ({ dao, proposal }: ProposalCardProps) => {
  const navigation = useNavigation()

  const openDaoPage = () => {
    // navigation.navigate('Dao', {
    //   dao: daoData
    // })
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={openDaoPage}>
      <View className="relative box-border flex flex-col mb-3 rounded-lg border border-grey-one p-3">
        <View className="w-full flex flex-row justify-between">
          <Text className="font-bold text-grey-three">{`${dao.name} • Proposal ${proposal.proposalNumber}`}</Text>
          <Text className="font-bold text-grey-three">{proposal.status}</Text>
        </View>
        <Text className="mt-0.5 font-bold text-lg">{proposal.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProposalCard
