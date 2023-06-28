import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Proposal } from '../../utils/types'
import clsx from 'clsx'
import { SavedDao } from '../../store/daos'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

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

  let timeLeft = ''

  if (proposal.status === 'PENDING') {
    timeLeft = `Starts ${dayjs().to(proposal.voteStart * 1000)}`
  } else if (proposal.status === 'ACTIVE') {
    timeLeft = `Ends ${dayjs().to(proposal.voteEnd * 1000)}`
  } else if (
    proposal.status === 'QUEUED' &&
    proposal.executableFrom &&
    proposal.expiresAt
  ) {
    if (dayjs().isBefore(proposal.executableFrom * 1000)) {
      timeLeft = `Executable ${dayjs().to(proposal.executableFrom * 1000)}`
    } else {
      timeLeft = `Expires ${dayjs().to(proposal.expiresAt * 1000)}`
    }
  }

  let statusTextColor = ''
  let statusBorderColor = ''

  if (proposal.status === 'PENDING') {
    statusTextColor = 'text-sky'
    statusBorderColor = 'border-sky/40'
  } else if (proposal.status === 'ACTIVE') {
    statusTextColor = 'text-green'
    statusBorderColor = 'border-green/40'
  } else {
    statusTextColor = 'text-purple'
    statusBorderColor = 'border-purple/30'
  }

  const statusString =
    proposal.status.toLowerCase().charAt(0).toUpperCase() +
    proposal.status.toLowerCase().slice(1)

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={openDaoPage}>
      <View className="relative box-border flex flex-col mb-3 rounded-lg border border-grey-one p-3">
        <View className="w-full flex flex-row justify-between">
          <Text className="font-bold text-grey-three text-base">
            {dao.name}
          </Text>
          <View className="flex flex-row gap-2 items-center">
            <Text className="font-medium text-grey-two text">{timeLeft}</Text>
            <View
              className={clsx(
                'border rounded-full py-0.5 px-2',
                statusBorderColor
              )}>
              <Text className={clsx('font-bold', statusTextColor)}>
                {statusString}
              </Text>
            </View>
          </View>
        </View>
        <Text className="mt-0.5 font-bold text-lg">{proposal.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProposalCard
